"use strict";

window.addEventListener("load", () => {
    const title = [
        "<",
        "C",
        "R",
        "I",
        "S",
        "T",
        "I",
        "A",
        "N",
        "",
        "M",
        "O",
        "R",
        "E",
        "N",
        "O",
        "/",
        ">"
    ];

    const header_title = document.querySelector("#header_title");

    let num = 0;

    const timer = setInterval(() => {
        if (num >= title.length) {
            clearInterval(timer);
            return;
        }

        const element = document.createElement("span");

        element.innerHTML = (title[num].length === 0) ? "&nbsp;" :  title[num];

        setTimeout(() => {
            element.classList.add("class_header_title");
        }, 50);

        num++;
        header_title.appendChild(element);
    }, 100);

    const id_about_years = document.querySelector("#id_about_years");

    id_about_years.textContent = "2021";

    checkOpenProjectPanel();
    checkMenuItems();
});

const checkOpenProjectPanel = () => {
    const id_project_panel = document.querySelector("#id_project_panel");

    id_project_panel.addEventListener("click", async () => {
        await setLoader();

        const id_modal_gallery = document.querySelector("#id_modal_gallery");
        const images = id_modal_gallery.querySelectorAll("img");

        const id_modal_exit = document.querySelector("#id_modal_exit");

        id_modal_exit.addEventListener("click", () => {
            const id_modal = document.querySelector("#id_modal");
            id_modal.classList.remove("class_modal_display");
        });

        images.forEach((str) => {
            str.addEventListener("click", (event) => {
                const id_image = document.querySelector("#id_image");
                id_image.classList.add("class_modal_display");

                const id_modal_image = document.querySelector("#id_modal_image");
                id_modal_image.classList.add("class_modal_image")
                id_modal_image.setAttribute("src", event.currentTarget.src);

                const id_image_exit = document.querySelector("#id_image_exit");
                id_image_exit.addEventListener("click", () => {
                    id_image.classList.remove("class_modal_display");
                })
            })
        })
    })
}

const setLoader = () => {
    return new Promise(async (resolve, reject) => {
        const id_modal_loader = document.querySelector("#id_loader");

        id_modal_loader.classList.add("class_modal_display");

        const timer = new Promise((resolve, reject) => {
            setTimeout(() => {
                id_modal_loader.classList.remove("class_modal_display");
                resolve(true);
            }, 500);
        }) 
        
        await timer;

        const id_modal = document.querySelector("#id_modal");
        id_modal.classList.add("class_modal_display");

        const id_project_title = document.querySelector("#id_project_title");

        const id_modal_title = document.querySelector("#id_modal_title");

        id_modal_title.textContent = id_project_title.textContent;
        resolve(true);
    })
}

const checkMenuItems = () => {
    const items = document.querySelectorAll("li");

    items.forEach((str) => {
        str.addEventListener("click", (ev) => {
            const id = ev.currentTarget.id;
            const element_id = id.split("-").pop();

            window.scrollTo({
                top: loadOffsets(element_id).top - 75,
                left: 0,
                behavior: "smooth"
            });
        })
    })
}

const loadOffsets = (element_id) => {
    const element = document.querySelector(`#${element_id}`);
    const rect = element.getBoundingClientRect();

    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}