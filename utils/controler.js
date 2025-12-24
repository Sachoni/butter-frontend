document.getElementById("upload-form").addEventListener("submit", async(e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Login required.");
        window.location.href = "login.html";
        return;
    }

    const formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("price", document.getElementById("price").value);
    formData.append("quantity", document.getElementById("quantity").value);
    formData.append("image", document.getElementById("image").files[0]);

    try {
        const res = await fetch("http://localhost:5000/api/products/upload", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        const data = await res.json();
        if (res.ok) {
            document.getElementById("upload-msg").textContent = "Upload successful!";
            document.getElementById("upload-form").reset();
        } else {
            document.getElementById("upload-err").textContent = data.error || "Upload failed.";
        }
    } catch (err) {
        document.getElementById("upload-err").textContent = "Network error.";
    }
});

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}