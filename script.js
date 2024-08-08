// Função para adicionar ferramenta e armazenar no localStorage
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
        
        // Armazenar dados no localStorage
        storeData();
        
        // Limpar o formulário após adicionar
        document.getElementById('toolForm').reset();
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

// Função para armazenar os dados da tabela no localStorage
function storeData() {
    const rows = Array.from(document.querySelectorAll('#toolTable tbody tr')).map(row => {
        return Array.from(row.querySelectorAll('td')).map(cell => cell.innerText);
    });
    
    localStorage.setItem('toolData', JSON.stringify(rows));
}

// Função para carregar os dados armazenados no localStorage
function loadData() {
    const storedData = localStorage.getItem('toolData');
    if (storedData) {
        const rows = JSON.parse(storedData);
        const tableBody = document.querySelector('#toolTable tbody');
        
        rows.forEach(rowData => {
            const row = document.createElement('tr');
            rowData.forEach(cellData => {
                const cell = document.createElement('td');
                cell.innerText = cellData;
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        });
    }
}

function clearData(){
    //Limpa dados 
    localStorage.removeItem('toolData');

    // Limpar a tabela na página
    const tableBody = document.querySelector('#toolTable tbody');
    tableBody.innerHTML = '';
}

// Função para exportar os dados para CSV
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

// Carregar os dados ao carregar a página
document.addEventListener('DOMContentLoaded', loadData);
