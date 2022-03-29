document.addEventListener('DOMContentLoaded', () => {
    // Task add function
    const taskAdd = (task, parent, add = true) => {
        // Add task to localStorage
        if (add) localStorage.tasks = JSON.stringify([...JSON.parse(localStorage.tasks), task]);

        // Create task in DOM
        const el = document.createElement('li');
        
        el.classList.add('list__item');

        if (task.done) el.classList.add('list__item_done');
        
        el.innerHTML = `
            <input type="checkbox" class="list__item-checkbox" ${task.done ? 'checked' : ''}/>
            <span class="list__item-text">${task.text}</span>
            <img src="img/trash-can.svg" class="list__item-delete"/>
        `;
        
        document.querySelector(parent).prepend(el);

        // Checkbox on click function that toggle active class and update indo in localStorage
        el.querySelector('.list__item-checkbox').addEventListener('change', () => {
            el.classList.toggle('list__item_done');
            localStorage.tasks = JSON.stringify(JSON.parse(localStorage.tasks)
                                                    .map(elem => ({
                                                        text: elem.text,
                                                        done: (elem.text == task.text) ? !elem.done : elem.done
                                                    })));
        });

        // Trash can on click, delete task from page and localStorage
        el.querySelector('.list__item-delete').addEventListener('click', () => {
            el.remove();
            localStorage.tasks = JSON.stringify(JSON.parse(localStorage.tasks)
                                                    .filter(elem => elem.text != task.text));
        });
    };

    // Check for 'tasks' in localStorage, if absent, add
    if (!localStorage.getItem('tasks')) localStorage.setItem('tasks', '[]');

    // Fill tasks list with tasks in localStorage when page load
    JSON.parse(localStorage.tasks).forEach(task => {
        taskAdd(task, '.list', false);
    });

    // Add new task
    document.querySelector('.create-task-btn').addEventListener('click', () => {
        const input = document.querySelector('.task-input'),
              task = {
                  text: input.value,
                  done: false
              };

        input.value = '';

        // Validate task to add in list
        if (!task.text) return; 
        if (JSON.parse(localStorage.getItem('tasks'))
                .map(task => task.text.toLowerCase())
                .includes(task.text.toLowerCase())) { alert('Already in list'); return; };

        taskAdd(task, '.list');
    });
});