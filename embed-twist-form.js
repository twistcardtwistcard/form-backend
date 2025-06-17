fetch('https://form-backend-p44w.onrender.com/twist-form.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('twist-form-container').innerHTML = html;
  });
