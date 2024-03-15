 // Global variables
 let products = [];
 let orders = [];

 // Display Products Management
 function showProducts() {
   hideAllSections();
   document.getElementById('products').style.display = 'block';
   showProductsManagement();
 }

 // Display Orders Management
 function showOrders() {
   hideAllSections();
   document.getElementById('orders').style.display = 'block';
   renderOrderList();
 }
 function viewOrderDetails(orderId) {
   const order = orders.find(order => order.id === orderId);
   if (order) {
     alert(`Order Details:\nID: ${order.id}\nCustomer: ${order.customer}\nDate: ${order.date}\nStatus: ${order.status}\nProduct: ${order.product.name}`);
   } else {
     alert(`Order ${orderId} not found`);
   }
 }

 // Hide all sections
 function hideAllSections() {
   const sections = document.querySelectorAll('section');
   sections.forEach(section => {
     section.style.display = 'none';
   });
 }

 // Render product list in product management
 function showProductsManagement() {
   const productList = document.getElementById('productList');
   productList.innerHTML = '';
   products.forEach(product => {
     renderProduct(product);
   });
 }
 function showCalendar() {
   hideAllSections();
   document.getElementById('calendar').style.display = 'block';
   renderCalendar();
 }

 // Function to render a product in the product management section
 function renderProduct(product) {
   const listItem = document.createElement('li');
   listItem.innerHTML = `<strong>${product.name}</strong> - Category: ${product.category}, Price: ${product.price}, Stock: ${product.stock}`;
   document.getElementById('productList').appendChild(listItem);
 }

 // Add a new product
 function addProduct() {
   const productName = prompt("Enter product name:");
   const productCategory = prompt("Enter product category:");
   const productPrice = prompt("Enter product price:");
   const productStock = prompt("Enter product stock quantity:");

   if (productName && productCategory && productPrice && productStock) {
     const newProduct = { 
       name: productName, 
       category: productCategory, 
       price: productPrice, 
       stock: productStock 
     };

     // Prompt for order date
     const orderDateStr = prompt("Enter order date (YYYY-MM-DD):");
     const orderDate = new Date(orderDateStr);

     if (isNaN(orderDate.getTime())) {
       alert("Invalid order date. Please enter a valid date in YYYY-MM-DD format.");
       return;
     }

     // Calculate delivery date (3 days from the order date)
     const deliveryDate = new Date(orderDate);
     deliveryDate.setDate(deliveryDate.getDate() + 3);
     newProduct.deliveryDate = deliveryDate;

     products.push(newProduct); // Add the new product to the global product list
     renderProduct(newProduct); // Render the new product in product management
     addOrderWithProduct(newProduct); // Add order with the new product
     alert(`Product "${productName}" added successfully!`);
   }
 }


 // Add order with the new product
 function addOrderWithProduct(newProduct) {
   const orderId = prompt("Enter order ID:");
   const customerName = prompt("Enter customer name:");

   if (orderId && customerName) {
     const newOrder = { 
       id: orderId, 
       customer: customerName, 
       date: new Date().toLocaleDateString(), // Order date is today's date
       status: "Pending", 
       product: newProduct 
     };
     
     orders.push(newOrder); // Add the new order to the global order list
     renderOrder(newOrder); // Render the new order in order management
   }
 }

 // Function to display orders for a specific day (based on delivery date)
 function displayOrdersForDay(year, month, day) {
   const selectedDate = new Date(year, month, day);
   const formattedDate = selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

   // Retrieve orders due for delivery on the selected day
   const ordersForDay = orders.filter(order => {
     const deliveryDate = new Date(order.product.deliveryDate);
     return (
       deliveryDate.getFullYear() === year &&
       deliveryDate.getMonth() === month &&
       deliveryDate.getDate() === day
     );
   });

   // Display orders for the selected day
   if (ordersForDay.length > 0) {
     const orderIds = ordersForDay.map(order => `Order ID: ${order.id}`).join('\n');
     alert(`Orders due for delivery on ${formattedDate}:\n${orderIds}`);
   } else {
     alert(`No orders due for delivery on ${formattedDate}`);
   }
 }

 // Function to render an order in the order management section
 function renderOrder(order) {
   const orderList = document.getElementById('orderList');
   const row = orderList.insertRow();
   row.innerHTML = `
     <td>${order.id}</td>
     <td>${order.customer}</td>
     <td>${order.date}</td>
     <td id="status-${order.id}">${order.status}</td>
     <td>
       <button onclick="viewOrderDetails('${order.id}')">View Details</button>
       <button onclick="updateOrderStatus('${order.id}')">Update Status</button>
       <button onclick="deleteOrder('${order.id}')">Delete</button>
     </td>
   `;
 }

 // Update order status
 function updateOrderStatus(orderId) {
   const order = orders.find(order => order.id === orderId);
   if (order) {
     const newStatus = prompt(`Enter new status for order ${orderId}:`);
     if (newStatus) {
       order.status = newStatus;
       const statusCell = document.getElementById(`status-${orderId}`);
       if (statusCell) {
         statusCell.textContent = newStatus;
       }
       alert(`Order ${orderId} status updated to: ${newStatus}`);
     }
   } else {
     alert(`Order ${orderId} not found`);
   }
 }

 // Function to delete an order
 function deleteOrder(orderId) {
   const index = orders.findIndex(order => order.id === orderId);
   if (index !== -1) {
     orders.splice(index, 1);
     renderOrderList();
     alert(`Order ${orderId} deleted successfully!`);
   } else {
     alert(`Order ${orderId} not found`);
   }
 }

 // Function to render the order list
 function renderOrderList() {
   const orderList = document.getElementById('orderList');
   orderList.innerHTML = '';
   orders.forEach(order => {
     renderOrder(order);
   });
 }

 // Display Dashboard
 function showDashboard() {
   hideAllSections();
   document.getElementById('dashboard').style.display = 'block';
   updateDashboardMetrics();
 }

 // Update dashboard metrics
 function updateDashboardMetrics() {
   document.getElementById('totalProducts').innerText = products.length;
   document.getElementById('totalOrders').innerText = orders.length;
   const totalRevenue = calculateTotalRevenue(); // Example function to calculate total revenue
   document.getElementById('totalRevenue').innerText = `$${totalRevenue}`;
   const activeUsers = calculateActiveUsers(); // Example function to calculate active users
   document.getElementById('activeUsers').innerText = activeUsers;
   const recentActivities = getRecentActivities(); // Example function to get recent activities
   const recentActivitiesList = document.getElementById('recentActivities');
   recentActivitiesList.innerHTML = '';
   recentActivities.forEach(activity => {
     const listItem = document.createElement('li');
     listItem.textContent = activity;
     recentActivitiesList.appendChild(listItem);
   });
 }

 // Example functions for calculations and data retrieval
 function calculateTotalRevenue() {
   // Logic to calculate total revenue
   return 5000; // Example value
 }

 function calculateActiveUsers() {
   // Logic to calculate active users
   return 100; // Example value
 }

 function getRecentActivities() {
   // Logic to retrieve recent activities
   return ['User logged in', 'New order placed', 'Product added']; // Example activities
 }
 function renderCalendar() {
   const calendarContainer = document.getElementById('calendarContainer');
   const calendar = document.createElement('table');
   calendar.classList.add('calendar');

   const today = new Date();
   const currentYear = today.getFullYear();
   const currentMonth = today.getMonth();

   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get total days in the current month
   const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Get day of the week of the first day

   // Render month and year
   const monthYearRow = calendar.insertRow();
   const monthYearCell = monthYearRow.insertCell();
   monthYearCell.colSpan = '7';
   monthYearCell.textContent = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today)} ${currentYear}`;
   monthYearCell.style.textAlign = 'center';

   // Render day headers
   const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   const headerRow = calendar.insertRow();
   dayLabels.forEach(day => {
     const cell = headerRow.insertCell();
     cell.textContent = day;
   });

   // Fill empty cells for days before the first day of the month
   const firstWeek = calendar.insertRow();
   for (let i = 7; i < firstDayOfMonth; i++) {
     firstWeek.insertCell();
   }

   // Render days of the month
   let currentDay = 1;
   let currentWeek = firstWeek;
   for (let day = 1; day <= daysInMonth; day++) {
     if (currentDay > 1 && currentDay % 7 === 1) {
       currentWeek = calendar.insertRow();
     }
     const cell = currentWeek.insertCell();
     cell.textContent = day;
     cell.addEventListener('click', () => {
       displayOrdersForDay(currentYear, currentMonth, day);
     });

     // Check if the current day corresponds to a due date
     const dueDate = new Date(currentYear, currentMonth, day);
     const isDueDate = orders.some(order => {
       const deliveryDate = new Date(order.product.deliveryDate);
       return (
         deliveryDate.getFullYear() === dueDate.getFullYear() &&
         deliveryDate.getMonth() === dueDate.getMonth() &&
         deliveryDate.getDate() === dueDate.getDate()
       );
     });

     if (isDueDate) {
       cell.classList.add('due-date');
     }

     currentDay++;
   }

   calendarContainer.innerHTML = '';
   calendarContainer.appendChild(calendar);
 }


 // Function to display orders for a specific day
 // Function to display orders for a specific day
function displayOrdersForDay(year, month, day) {
 const selectedDate = new Date(year, month, day);
 const formattedDate = selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

 // Retrieve orders due for delivery on the selected day
 const ordersForDay = orders.filter(order => {
   const deliveryDate = new Date(order.product.deliveryDate);
   return (
     deliveryDate.getFullYear() === year &&
     deliveryDate.getMonth() === month &&
     deliveryDate.getDate() === day
   );
 });

 // Display orders for the selected day
 if (ordersForDay.length > 0) {
   const orderIds = ordersForDay.map(order => `Order ID: ${order.id}`).join('\n');
   alert(`Orders due for delivery on ${formattedDate}:\n${orderIds}`);
 } else {
   alert(`No orders due for delivery on ${formattedDate}`);
 }
}


 // Function to populate orders with deliveryDate property
 function populateOrdersWithDeliveryDate() {
   // Example: Add deliveryDate property to each order based on order date and estimated delivery time
   orders.forEach(order => {
     const orderDate = new Date(order.date);
     const deliveryDate = new Date(orderDate.setDate(orderDate.getDate() + 3)); // Assuming delivery in 3 days
     order.deliveryDate = deliveryDate;
   });
 }

 // Call function to populate orders with deliveryDate property
 populateOrdersWithDeliveryDate();