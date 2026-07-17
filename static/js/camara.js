const cards = document.querySelectorAll(".product-card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(c => {

            if(c !== card){
                c.classList.remove("active");
            }

        });

        card.classList.toggle("active");

    });

});

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const brand = button.dataset.brand;

        cards.forEach(card => {

            if (
                brand === "all" ||
                card.classList.contains(brand)
            ) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }

        });

    });

});