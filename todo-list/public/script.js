document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Form gönderildiğinde
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Sayfanın yenilenmesini engelle

        const taskText = taskInput.value.trim(); // Girişten görev metnini al

        if (taskText !== '') { // Boş bir görev eklenmemişse
            addTask(taskText); // Görevi listeye ekle
            taskInput.value = ''; // Giriş kutusunu temizle
            taskInput.focus(); // Giriş kutusuna odaklan
        }
    });

    // Yeni bir görevi listeye ekle
    function addTask(taskText) {
        const li = document.createElement('li'); // Yeni bir <li> öğesi oluştur
        const span = document.createElement('span'); // Yeni bir <span> öğesi oluştur (metin için)
        span.textContent = taskText; // Görev metnini <span> içeriğine ekle
        li.appendChild(span); // <span> öğesini <li> öğesine ekle

        // Butonları oluştur
        const actions = document.createElement('div');
        actions.classList.add('actions');

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', function() {
            const newTaskText = prompt('Edit the task:', span.textContent); // Yeni görev metnini al
            if (newTaskText !== null && newTaskText.trim() !== '') {
                span.textContent = newTaskText; // Görev metnini güncelle
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function() {
            li.remove(); // Görevi listeden kaldır
        });

        const doneButton = document.createElement('button');
        doneButton.innerHTML = '<i class="fas fa-check"></i>';
        doneButton.classList.add('done-btn');
        doneButton.addEventListener('click', function() {
            span.style.textDecoration = 'line-through'; // Metni çiz
        });

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        actions.appendChild(doneButton);

        li.appendChild(actions); // Butonları <li> öğesine ekle

        taskList.appendChild(li); // <li> öğesini listeye ekle
    }
});
