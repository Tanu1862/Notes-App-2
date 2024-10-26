const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Load notes from localStorage on page load
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || '';
}
showNotes();

// Update localStorage whenever notes are changed
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Create a new note
createBtn.addEventListener("click", () => {
    const inputBox = document.createElement("p");
    const img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png";
    img.className = "delete-btn";

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    updateStorage();
    inputBox.focus(); // Automatically focus on the new note for editing
});

// Handle delete and content editing
notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === "P") {
        const notes = document.querySelectorAll(".input-box");
        notes.forEach(note => {
            note.onkeyup = function () {
                updateStorage();
            };
        });
    }
});

// Prevent "Enter" from creating a new paragraph in editable notes
document.addEventListener("keydown", event => {
    if (event.key === "Enter" && document.activeElement.classList.contains("input-box")) {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});