document.addEventListener("DOMContentLoaded", function () {
    const editor = document.getElementById("editor-content");
    const boldButton = document.getElementById("bold-button");
    const italicButton = document.getElementById("italic-button");
    const underlineButton = document.getElementById("underline-button");
    const textColorPicker = document.getElementById("text-color-picker");
    const bgColorPicker = document.getElementById("bg-color-picker");
    const clearButton = document.getElementById("clear-button");
    const fileInput = document.getElementById("file-input");

    // Function to update the editor's content with formatting
    function updateEditorContent(command, value = null) {
        document.execCommand(command, false, value);
    }

    // Function to change text color
    function changeTextColor() {
        const color = textColorPicker.value;
        document.execCommand("styleWithCSS", false, true);
        document.execCommand("foreColor", false, color);
        document.execCommand("styleWithCSS", false, false);
    }

    // Function to change background color
    function changeBgColor() {
        const color = bgColorPicker.value;
        document.execCommand("styleWithCSS", false, true);
        document.execCommand("hiliteColor", false, color);
        document.execCommand("styleWithCSS", false, false);
    }

    // Event listeners for formatting buttons
    boldButton.addEventListener("click", () => updateEditorContent("bold"));
    italicButton.addEventListener("click", () => updateEditorContent("italic"));
    underlineButton.addEventListener("click", () => updateEditorContent("underline"));
    textColorPicker.addEventListener("input", changeTextColor);
    bgColorPicker.addEventListener("input", changeBgColor);

    // Event listener to clear the editor's content
    clearButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear the content?")) {
            editor.innerHTML = "";
        }
    });

    // Event listener for file input change
    function handleFileInput(event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const fileContent = e.target.result;
                editor.innerHTML = fileContent;
            };

            reader.readAsText(file);
        }
    }

    fileInput.addEventListener("change", handleFileInput);

    // Retrieve saved content from local storage on page load
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
        editor.innerHTML = savedContent;
    }

    // Save user's text input in local storage
    editor.addEventListener("input", function () {
        const content = editor.innerHTML;
        localStorage.setItem("editorContent", content);
    });
});
