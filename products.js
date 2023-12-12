/**
 * Declaración de los productos
 */
const products = {
    bread: 1.5,
    cake: 10.0,
};

const productLinkedList = new LinkedList();

document.getElementById("product").addEventListener("change", function () {
    let product = this.value;
    let price = products[product];
    document.getElementById("price").value = price;
});

/**
 * Nodo de la lista de productos
 */
class ProductNode {
    /**
     * Constructor de la lista de productos
     * @param {*} product producto
     * @param {*} price precio
     * @param {*} quantity cantidad
     */
    constructor(product, price, quantity) {
        this.product = product;
        this.price = price;
        this.quantity = quantity;
        this.subtotal = price * quantity;
        this.next = null;
    }
}

/**
 * Listas enlazadas
 */
class LinkedList {
    /**
     * Constructor de la lista enlazada
     */
    constructor() {
        this.head = null;
        this.totalReceipt = 0;
    }

    /**
     * Agrega un producto
     * @param {*} product producto
     * @param {*} price precio
     * @param {*} quantity cantidad
     */
    addProduct(product, price, quantity) {
        const newNode = new ProductNode(product, price, quantity);
        newNode.next = this.head;
        this.head = newNode;
        this.totalReceipt += newNode.subtotal;
    }

    /**
     * Elimina un producto
     * @param {*} product producto
     * @returns nada
     */
    deleteProduct(product) {
        if (!this.head) {
            return;
        }

        let current = this.head;
        let previous = null;

        while (current && current.product !== product) {
            previous = current;
            current = current.next;
        }

        if (current) {
            this.totalReceipt -= current.subtotal;

            if (previous) {
                previous.next = current.next;
            } else {
                this.head = current.next;
            }
        }
    }

    /**
     * Salta un alert con el recibo
     */
    printReceipt() {
        let current = this.head;
        let receiptText = "Recibo de Compra:\n\n";

        while (current) {
            receiptText += `${current.product} x ${current.quantity} - $${current.subtotal.toFixed(2)}\n`;
            current = current.next;
        }

        receiptText += `\nTotal: $${this.totalReceipt.toFixed(2)}`;
        alert(receiptText);
    }
}

/**
 * Agrega una línea de producto
 * @returns nada
 */
function addProductLine() {
    let productSelect = document.getElementById("product");
    let product = productSelect.value;
    let price = products[product];
    let quantity = parseInt(document.getElementById("quantity").value);

    if (isNaN(quantity) || quantity < 1) {
        alert("Por favor, ingrese una cantidad válida mayor o igual a 1.");
        document.getElementById("quantity").value = 1;
        return;
    }

    productLinkedList.addProduct(product, price, quantity);
    updateOrderTable();
}

/**
 * Elimina una línea de producto
 * @param {*} btn botón de eliminación con el padre del producto
 */
function deleteProductLine(btn) {
    let row = btn.parentNode.parentNode;
    let product = row.cells[0].innerHTML;
    productLinkedList.deleteProduct(product);
    updateOrderTable();
}

/**
 * Actualiza la tabla de pedidos
 */
function updateOrderTable() {
    let orderTable = document.getElementById("order-table");
    orderTable.innerHTML = ""; // Limpiar la tabla

    let current = productLinkedList.head;

    while (current) {
        let row = orderTable.insertRow(0);
        let cellProduct = row.insertCell(0);
        let cellPrice = row.insertCell(1);
        let cellQuantity = row.insertCell(2);
        let cellSubtotal = row.insertCell(3);
        let cellActions = row.insertCell(4);

        cellProduct.innerHTML = current.product;
        cellPrice.innerHTML = current.price.toFixed(2);
        cellQuantity.innerHTML = current.quantity;
        cellSubtotal.innerHTML = current.subtotal.toFixed(2);
        cellActions.innerHTML = '<button class="btn btn-danger" onclick="deleteProductLine(this)">Eliminar</button>';

        current = current.next;
    }

    document.getElementById("totalReceipt").innerHTML = productLinkedList.totalReceipt.toFixed(2);
}

/**
* Llama a la función printReceipt de la lista enlazada
*/
function printReceipt() {
    productLinkedList.printReceipt();
}
