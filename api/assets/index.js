const { app } = require('@azure/functions');

// In-memory storage (replace with database in production)
let assets = [
    { id: 1, name: 'Laptop Dell XPS', type: 'Computer', status: 'active', location: 'Office A' },
    { id: 2, name: 'Printer HP LaserJet', type: 'Printer', status: 'maintenance', location: 'Office B' },
    { id: 3, name: 'Conference Phone', type: 'Equipment', status: 'active', location: 'Meeting Room 1' }
];

app.http('assets', {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const method = request.method;
        
        try {
            switch (method) {
                case 'GET':
                    return {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(assets)
                    };
                
                case 'POST':
                    const newAsset = await request.json();
                    newAsset.id = Math.max(...assets.map(a => a.id), 0) + 1;
                    assets.push(newAsset);
                    return {
                        status: 201,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newAsset)
                    };
                
                case 'PUT':
                    const updatedAsset = await request.json();
                    const index = assets.findIndex(a => a.id === updatedAsset.id);
                    if (index !== -1) {
                        assets[index] = updatedAsset;
                        return {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(updatedAsset)
                        };
                    }
                    return { status: 404, body: 'Asset not found' };
                
                case 'DELETE':
                    const idToDelete = parseInt(request.query.get('id'));
                    const deleteIndex = assets.findIndex(a => a.id === idToDelete);
                    if (deleteIndex !== -1) {
                        const deletedAsset = assets.splice(deleteIndex, 1)[0];
                        return {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(deletedAsset)
                        };
                    }
                    return { status: 404, body: 'Asset not found' };
                
                default:
                    return { status: 405, body: 'Method not allowed' };
            }
        } catch (error) {
            return {
                status: 500,
                body: JSON.stringify({ error: error.message })
            };
        }
    }
});