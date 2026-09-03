let cart = JSON.parse(localStorage.getItem('halyaCart') || '[]');
function updateCart(){
  document.getElementById('cartCount').textContent=cart.reduce((s,i)=>s+i.qty,0);
  const box=document.getElementById('cartItems');
  if(!cart.length){box.innerHTML='<p>Your cart is empty.</p>';document.getElementById('cartTotal').textContent='0.00';return;}
  box.innerHTML=cart.map((i,n)=>`<div class="cart-row"><span>${i.name} × ${i.qty}</span><span>$${(i.price*i.qty).toFixed(2)} <button onclick="removeItem(${n})">×</button></span></div>`).join('');
  document.getElementById('cartTotal').textContent=cart.reduce((s,i)=>s+i.price*i.qty,0).toFixed(2);
  localStorage.setItem('halyaCart',JSON.stringify(cart));
}
function addToCart(name,price){let i=cart.find(x=>x.name===name);i?i.qty++:cart.push({name,price,qty:1});updateCart();document.getElementById('cartModal').classList.add('open')}
function removeItem(n){cart.splice(n,1);updateCart()}
document.getElementById('cartBtn').onclick=()=>document.getElementById('cartModal').classList.add('open');
document.getElementById('closeCart').onclick=()=>document.getElementById('cartModal').classList.remove('open');
function checkout(){alert('Demo checkout: connect Stripe, Square, Shopify, or another payment provider before accepting orders.')}
function subscribe(e){e.preventDefault();document.getElementById('subscribeMsg').textContent='Thank you — you’re on the HALYA list.';e.target.reset()}
updateCart();
