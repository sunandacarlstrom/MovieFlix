const createHTMLElement = (element, classes, text) => {
    const HTMLElement = document.createElement(element);

    if (classes != "" && classes != undefined) {
        const classesArray = classes.split(" ");

        classesArray.forEach(cssClass => {
            HTMLElement.classList.add(cssClass);
        });
    }
    
    if (text != undefined) {
        const HTMLText = document.createTextNode(text);
        HTMLElement.appendChild(HTMLText);
    }

    return HTMLElement;
};

const createHTMLElementImage = (classes, endpoint, alt) => {
    const image = document.createElement("img");
    image.classList.add(classes);
    image.src = endpoint ? `https://image.tmdb.org/t/p/w500${endpoint}` : `../assets/images/No-Image.jpg`;
    image.alt = alt;

    return image; 
};

export { createHTMLElement, createHTMLElementImage };
