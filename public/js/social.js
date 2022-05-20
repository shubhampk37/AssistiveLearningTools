function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  // event.currentTarget.style.backgroundColor = "yellow";
}

function onDragOver(event) {
  event.preventDefault();
}
function onDrop(event) {
  const id = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  dropzone.appendChild(draggableElement);
  event.dataTransfer.clearData();
}
function onDragEnd(e) {
  e.currentTarget.style.backgroundColor = "#4AAE9B";
}

function check() {
  let parent = document.getElementById("dropzone");
  let moved = parent.children;
  let answered = [];
  let correct = ["d1", "d2", "d3", "d4"];
  for (i = 0; i < moved.length; i++) {
    answered.push(moved[i].getAttribute("id"));
  }
  if (moved.length == 4) {
    if (JSON.stringify(answered) == JSON.stringify(correct)) {
      document.querySelector(".example-dropzone").style.backgroundColor =
        "#60b347";
      alert("Correct answer");
    } else alert("Wrong answer");
  } else {
    alert("Place all the images");
  }
  console.log(answered);
}
