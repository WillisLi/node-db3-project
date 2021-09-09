-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
select * from category as c
join product as p on c.Id = p.CategoryId 
-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
select * from shipper as s
join order as o on s.Id = o.ShipVia
where o.OrderDate < '2012-08-09 00:00:00.000'
-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
select p.productname, od.quantity from orderdetail as od
join product as p on od.ProductId = p.id
where od.OrderId = 10251

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
select od.OrderId, c.CompanyName, e.LastName, o.CustomerId, c.Id from Order as o
join Customer as c on o.CustomerId = c.Id