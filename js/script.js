class Mansonry {
  constructor(element, options) {
    this.containerNode = element;
    this.childrenNodes = element.childNodes;
    this.childrenData = Array.from(element.childNodes)
      .filter((e) => e.nodeName === "LI")
      .map((e) => ({
        width: e.clientWidth,
        height: e.clientHeight,
      }));
    this.options = options;

    this.drawMansonry();
  }

  drawMansonry() {
    const columns = [
      this.childrenData.filter((_, i) => i % 2 === 0),
      this.childrenData.filter((_, i) => i % 2 !== 0),
    ];

    this.containerNode.style.height =
      columns[0].reduce((acc, e) => acc + e.height, 0) + "px";

    const positions = [
      columns[0].map((_, i) => {
        const top =
          columns[0].slice(0, i).reduce((acc, e) => acc + e.height, 0) +
          i * this.options.gap +
          "px";
        return {
          top,
          left: 0,
        };
      }),
      columns[1].map((_, i) => {
        const top =
          columns[1].slice(0, i).reduce((acc, e) => acc + e.height, 0) +
          i * this.options.gap +
          "px";

        return {
          top,
          left: columns[0][i].width + this.options.gap + "px",
        };
      }),
    ];

    const positionsCombined = [];
    for (let i = 0; i < this.childrenData.length; i++) {
      i % 2 === 0
        ? positionsCombined.push(positions[0].shift())
        : positionsCombined.push(positions[1].shift());
    }

    Array.from(this.childrenNodes)
      .filter((e) => e.nodeName === "LI")
      .forEach((e, i) => {
        e.style.position = "absolute";
        e.style.top = positionsCombined[i].top;
        e.style.left = positionsCombined[i].left;
      });
  }
}

new Mansonry(document.getElementById("mansonry"), { gap: 24 });

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const topButton = document.querySelector(".button__up");
topButton.addEventListener("click", () => {
  document.documentElement.style.scrollBehavior = "smooth";
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

window.onscroll = () => {
  if (document.body.scrollTop > 76 || document.documentElement.scrollTop > 76) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
};
