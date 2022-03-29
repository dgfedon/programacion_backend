const fs = require('fs');

class Messages {
    constructor (fileName) {
        this.fileName = fileName;
    }
    async save(data) {
        const getData = await this.getAll();

        try {
            getData.push(data);
            // Escribir en archivo
            await fs.writeFile(this.fileName, JSON.stringify(getData, null, 2), (error) => {
                if (error) {
                    console.log(`Error al escribir ${this.fileName}: ${error}`);
                }
            });
        } catch (error) {
            console.log(`Error al escribir archivo ${error}`);
        }

        return data;
    }
    async getById(id) {
        const getData = await this.getAll();

        try {
            // Encontrar mediante id
            const prod = getData.find(item => item.id === id);
            if (prod) {
                console.log(`Búsqueda por id: ${JSON.stringify(prod, null, 2)}`);
            } else {
                // Null si no se encuentra
                console.log(`No se pudo encontrar id: ${id}`, null);
            }
        } catch (error) {
            console.log(`Error al obtener id: ${error}`);
        }
    }
    async getAll() {
        try {
            // Obtener lectura del archivo
            const data = await fs.readFileSync(this.fileName,'utf-8');

            return JSON.parse(data);

        } catch (error) {
            console.log(`Error al obtener lectura ${error}`);
        }
    }
    async deleteById(id) {
        try {
            // Filtrar mediante id
            const product = this.fileContent.filter(item => item.id !== id);
            if (product) {
                // Reescribir restantes
                await fs.promises.writeFile(this.fileName, JSON.stringify(product, null, 2));

                console.log(`Producto eliminado por id: ${id}`);
            }
        } catch (error) {
            console.log(`Error al eliminar por id ${error}`);
        }

    }
    async deleteAll() {
        // Borrar archivo
        await fs.unlink(this.fileName, (error) => {
            if (error) {
                console.log(`Error al eliminar ${error}`);
            } else {
                console.log('Se eliminó correctamente');
            }
        })
    }
}

module.exports = Messages;