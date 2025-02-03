/*
===============================================
 HENTER BLOGG DATA OG OPPDATERER NETTSIDEN 
===============================================

Denne koden henter blogginnhold fra en spesifisert URL og oppdaterer elementer på nettsiden.
Den er laget for å hente informasjon fra et blogginnlegg med kategori "Article" og 
bruker ID-er for å finne riktige seksjoner og knapper som skal oppdateres.

For å tilpasse denne koden til en annen nettside, gjør følgende endringer:
1. Endre `blogUrl` til riktig URL der blogginnleggene ligger.
2. Oppdater selektoren for `blogPost` hvis HTML-strukturen er forskjellig.
3. Tilpass selektorene for `blogImage`, `blogTitle`, og `blogLink`.
4. Juster `data-section-id` for seksjoner som skal oppdateres med det nye bildet.
5. Endre ID-er for tekstblokker og knapper som skal oppdateres.
6. Oppdater kategori-filteret hvis nettsiden bruker en annen struktur.
*/

document.addEventListener("DOMContentLoaded", function () {
    async function fetchBlogData() {
        try {
            // 1. Hent HTML fra bloggseksjonen
            const blogUrl = '/news-1'; // <-- OPPDATER DENNE URL-EN VED BEHOV
            const response = await fetch(blogUrl);
            const html = await response.text();

            // 2. Parse HTML for å finne blogginnlegg
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // 3. Finn første innlegg med kategori "Article"
            const blogPost = doc.querySelector('article.blog-basic-grid--container .blog-categories-list a.blog-categories[href*="Article"]');
            if (blogPost) {
                const articleElement = blogPost.closest('article');
                const blogImage = articleElement.querySelector('.image-wrapper img');
                const blogTitle = articleElement.querySelector('.blog-title a');
                const blogLink = blogTitle ? blogTitle.href : null;

                // 4. Oppdater bilde i spesifikke seksjoner
                if (blogImage) {
                    const newImageSrc = blogImage.getAttribute('src');
                    document.querySelectorAll('section[data-section-id="679099dce78b596258a087c1"] img').forEach(img => {
                        img.src = newImageSrc;
                        img.setAttribute('srcset', '');
                    });
                    document.querySelectorAll('section[data-section-id="67920b0428c682785ffc0b48"] img').forEach(img => {
                        img.src = newImageSrc;
                        img.setAttribute('srcset', '');
                    });
                }

                // 5. Oppdater tekstblokker
                if (blogTitle) {
                    const textElement1 = document.querySelector("#block-d06eb6cef03ccd4d9314 h3");
                    if (textElement1) textElement1.textContent = blogTitle.textContent.trim();
                    
                    const textElement2 = document.querySelector("#artical-newspage");
                    if (textElement2) textElement2.textContent = blogTitle.textContent.trim();
                }

                // 6. Oppdater knapper med blogglenke
                if (blogLink) {
                    const buttonElement1 = document.querySelector("#block-b368d3061ff63cac9f2a a");
                    if (buttonElement1) buttonElement1.href = blogLink;
                    
                    const buttonElement2 = document.querySelector("#block-750319dbe78135f6d74f a");
                    if (buttonElement2) buttonElement2.href = blogLink;
                }
            }
        } catch (error) {
            console.error("Feil ved henting av bloggdata:", error);
        }
    }

    fetchBlogData();
});
