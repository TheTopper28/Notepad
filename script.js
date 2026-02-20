function newFile() {
    if (confirm("Are you sure you want to create a new file?")) {
        document.getElementById("textArea").value = "";
    }
}

function saveFile() {
    const text = document.getElementById("textArea").value;
    const blob = new Blob([text], { type: "text/plain" });
    const anchor = document.createElement("a");

    anchor.download = "notepad.txt";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = "_blank";
    anchor.click();
}

function openFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("textArea").value = e.target.result;
    };
    reader.readAsText(file);
}
