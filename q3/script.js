document.getElementById('graphForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const numVertices = parseInt(document.getElementById('vertices').value);
    generateGraph(numVertices);
});

function generateGraph(numVertices) {
    const graphContainer = document.getElementById('graphContainer');
    graphContainer.innerHTML = '';
    
    // Random adjacency matrix with weights between 1 and 10
    const graph = Array.from({ length: numVertices }, () => 
        Array.from({ length: numVertices }, () => Math.floor(Math.random() * 10) + 1));

    // Create vertex nodes visually
    for (let i = 0; i < numVertices; i++) {
        const vertex = document.createElement('div');
        vertex.classList.add('vertex');
        vertex.textContent = i;
        graphContainer.appendChild(vertex);
    }

    // Take a random source vertex
    const source = Math.floor(Math.random() * numVertices);
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Shortest paths from Vertex ${source}:`;

    const distances = dijkstra(graph, source);
    for (let i = 0; i < distances.length; i++) {
        resultDiv.innerHTML += `<p>Vertex ${i}: ${distances[i]}</p>`;
    }
}

// Dijkstra's algorithm to find shortest path
function dijkstra(graph, src) {
    const numVertices = graph.length;
    const dist = Array(numVertices).fill(Infinity);
    dist[src] = 0;
    const visited = Array(numVertices).fill(false);

    for (let count = 0; count < numVertices - 1; count++) {
        const u = minDistance(dist, visited);
        visited[u] = true;

        for (let v = 0; v < numVertices; v++) {
            if (!visited[v] && graph[u][v] && dist[u] !== Infinity && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }

    return dist;
}

function minDistance(dist, visited) {
    let min = Infinity, minIndex = -1;
    for (let v = 0; v < dist.length; v++) {
        if (!visited[v] && dist[v] <= min) {
            min = dist[v];
            minIndex = v;
        }
    }
    return minIndex;
}
