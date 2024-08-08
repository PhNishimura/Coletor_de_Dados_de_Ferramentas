function addTool() {
    // Obtendo valores dos campos do formulário
    const height = document.getElementById('height').value;
    const width = document.getElementById('width').value;
    const length = document.getElementById('length').value;
    const weight = document.getElementById('weight').value;
    const machine = document.getElementById('machine').value;
    const numberI = document.getElementById('numberI').value;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (height && width && length && weight && machine) {
        const tableBody = document.querySelector('#toolTable tbody');
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${height}</td>
            <td>${width}</td>
            <td>${length}</td>
            <td>${weight}</td>
            <td>${machine}</td>
            <td>${numberI}</td>
        `;
        
        tableBody.appendChild(row);
        
        // Limpar o formulário após adicionar
        document.getElementById('toolForm').reset();
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

function exportToCSV() {
    const rows = [];
    const table = document.getElementById('toolTable');
    
    // Extrair os cabeçalhos
    const headers = Array.from(table.querySelectorAll('thead th')).map(header => header.innerText);
    rows.push(headers.join(','));
    
    // Extrair os dados das linhas
    Array.from(table.querySelectorAll('tbody tr')).forEach(row => {
        const cells = Array.from(row.querySelectorAll('td')).map(cell => cell.innerText);
        rows.push(cells.join(','));
    });
    
    // Criar o CSV
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.join('\n');
    const encodedUri = encodeURI(csvContent);
    
    // Criar o link para download
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ferramentas.csv');
    document.body.appendChild(link);
    
    link.click();
    document.body.removeChild(link);
}
