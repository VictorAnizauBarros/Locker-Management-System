document.querySelectorAll(".locker-item").forEach((item) => {
  item.addEventListener("click", function () {
    const id = this.dataset.id;
    const status = this.dataset.status;

    if (status === "available") {
      fetch("/rent-locker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Armário alugado com sucesso!");
            this.classList.remove("available");
            this.classList.add("reserved");
          } else {
            alert("Erro ao alugar o armário.");
          }
        });
    } else {
      alert("Este armário não está disponível.");
    }
  });
});
