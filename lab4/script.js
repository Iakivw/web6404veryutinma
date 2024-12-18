document.addEventListener('DOMContentLoaded', () => {
    const currentPage = document.body.id;

    if (currentPage === 'form-page') {

        const form = document.getElementById('feedback-form');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            console.log(data)

            fetch('http://localhost:8000/home', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Form submitted successfully!');
                    console.log(data);
                })
                .catch(error => {
                    alert('There is no server right now ¯\_(ツ)_/¯');
                    console.error(error);
                });
        });
    }


    if (currentPage === 'table-page') {
        // Async Data Fetching
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8000/home');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                const table = document.getElementById('data-table');
                table.innerHTML = ''; // Clear loading text

                // Add headers
                table.innerHTML += `
                <div class="grid-header">Имя</div>
                <div class="grid-header">Оценка</div>
                <div class="grid-header">Отзыв</div>
                `;

                for (const item of data["data"]) {
                    table.innerHTML += `
                    <div class="grid-item">${item.name}</div>
                    <div class="grid-item">${item.rating}</div>
                    <div class="grid-item">${item.feedback}</div>`;
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                document.getElementById('data-table').innerHTML = '<div>Error loading data</div>';
            }
        }

        fetchData();
    }
});
