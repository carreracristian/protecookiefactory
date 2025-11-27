/* --------------------------------------------
   app.js con:
   ✔ Persistencia con localStorage
   ✔ Placeholders para imágenes
   ✔ Todo lo demás intacto
--------------------------------------------- */

/* ---------- Productos (5 sabores, 3 imágenes c/u) ---------- */
const products = [
  {
    id: 'clasicas',
    name: 'Clásicas con chips',
    price: 1200,
    desc: 'Galletas clásicas, chewy en el centro y con abundantes chips de chocolate.',
    imgs: [
      'https://cuquipostres.com/wp-content/uploads/2024/03/DSC09954.jpg',
      'https://www.clarin.com/2024/08/29/9l4tM9_2j_2000x1500__1.jpg',
      'https://cocinaconcoqui.com/wp-content/uploads/2024/10/galletas-de-chcolate-americanas-horneadas.jpg'
    ]
  },
  {
    id: 'chocolate',
    name: 'Doble Chocolate',
    price: 1500,
    desc: 'Doble chocolate para los fanáticos: masa + trozos intensos.',
    imgs: [
      'https://okdiario.com/img/2016/12/24/galletas-chocolate.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTISybdtXevXx4ToqaMPM7foB0Rw_3SFJQwb0ygVKk-6KXymJNRRoLIWBHFLZJwJF0hj3k&usqp=CAU',
      'https://i0.wp.com/sarasellos.com/wp-content/uploads/2025/05/galletas-chocolate-dia-padre-4.jpg?resize=683%2C1024&ssl=1'
    ]
  },
  {
    id: 'dulcedeleche',
    name: 'Dulce de leche',
    price: 1400,
    desc: 'Rellenas con dulce de leche artesanal, textura melosa.',
    imgs: [
      'https://elmundoeats.es/wp-content/uploads/2020/11/FP-Nutella-stuffed-chocolate-chunk-cookies.jpg',
      'https://img-global.cpcdn.com/recipes/6077724ce9c7d126/680x781cq80/cookies-rellenas-de-dulce-de-leche-foto-principal.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-VbfzbzTfdA3C8xnbIz-WmKMPwe3oQLU_1Jeg336hmMwx_dnjvDyB7izHNu9kV_4Rsxw&usqp=CAU'
    ]
  },
  {
    id: 'cocoddle',
    name: 'Coco y dulce de leche',
    price: 1250,
    desc: 'Toque tropical: coco y dulce de leche en cada mordida.',
    imgs: [
      'https://i0.wp.com/gingerskitchenn.com/wp-content/uploads/2023/11/C49EDC66-4C6B-45F3-B116-0642B549BB36.jpeg?resize=800%2C530&ssl=1',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjCtMDq6aJhpgIuodeaN8wxJn4xELa2pYLqg&s'
    ]
  },
  {
    id: 'redvelvet',
    name: 'Red Velvet',
    price: 1600,
    desc: 'Red velvet con chips blancos y textura suave.',
    imgs: [
      'https://leonardoespinoza.com.ar/cdn/shop/files/Red_Velvet_Cookies_New_York.webp?v=1752580564&width=1500',
      'https://zestybake.com/wp-content/uploads/2024/02/IMG_1938-scaled-e1721251108642-768x662.webp',
      'https://okdiario.com/img/2016/01/02/receta-de-red-velvet-cookies.jpg'
    ]
  },
  {
    id: 'canela',
    name: 'Canela y nueces',
    price: 1500,
    desc: 'Canela para los fanáticos: masa + trozos de nueces.',
    imgs: [
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLb7U1OnFcRySg4vivXdJekAyCRPNh3h_G4MAxXIkclLymA2mVs5ATWNBW6a5W_Xtv299IVGmeO2_Rdq5dgRF7wF0_C32_kBomXNULbQkxEpg5Xs34SLC7iSeNRK6ppRSm_y_wMtCrZagT/s1600/GALLETAS+DE+NUEZ+Y+CANELA+%25282%2529.JPG'
    ]
  },
  {
    id: 'nutella',
    name: 'Nutella',
    price: 1500,
    desc: 'Rellenas con nutella, textura única.',
    imgs: [
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZabKYZ5fFvgGWGWNMCyW5hnMH-_qQ_qOws0o1IIjk0YeUDQf0l9_Z1EaFfMrfLtsImYZy3qYPNoHItwia9l9NiiTcQKn50wmMvD-Gyl4UerT-ad2mYIBUFa5WytvNOkPEPsT4-IMeeRI/s1600/galletas+rellenas+nutella+1.jpg',
      'https://i.ytimg.com/vi/KkflNZ2qwLg/maxresdefault.jpg',
      'https://alessandrapenny.com/cdn/shop/files/GalletasAle3217.jpg?v=1688592854'
    ]
  }
];

/* ---------- Estado ---------- */
const state = {
  cart: []
};

/* ---------- Recuperar carrito al iniciar ---------- */
const saved = localStorage.getItem("carrito");
if (saved) {
  try {
    state.cart = JSON.parse(saved);
  } catch {
    state.cart = [];
  }
}

/* ---------- Guardar carrito ---------- */
function persistCart() {
  localStorage.setItem("carrito", JSON.stringify(state.cart));
}

/* ---------- Utils ---------- */
const formatMoney = (n) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n);
const $ = (sel) => document.querySelector(sel);

/* ---------- Render productos ---------- */
function renderProducts(){
  const list = $('#product-list');
  list.innerHTML = '';
  products.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('data-id', p.id);
    card.innerHTML = `
      <img src="${p.imgs[0]}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="muted">${p.desc}</p>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div class="price">${formatMoney(p.price)}</div>
      </div>
    `;
    card.addEventListener('click', ()=> openProductModal(p.id));
    list.appendChild(card);
  });
}

/* ---------- Modal producto ---------- */
const productModal = $('#product-modal');
const modalName = $('#modal-name');
const modalDesc = $('#modal-desc');
const modalPrice = $('#modal-price');
const carouselImage = $('#carousel-image');
const prevImgBtn = $('#prev-img');
const nextImgBtn = $('#next-img');
const qtyInput = $('#qty');
const modalTotal = $('#modal-total');
const modalCartLegend = $('#modal-cart-legend');

let currentProduct = null;
let currentImgIndex = 0;
/* ---------- Swipe entre productos (moderno) ---------- */
function enableProductSwipe() {
  const modal = document.getElementById("product-modal");
  if (!modal) return;

  let startX = 0;
  let startY = 0;
  let currentX = 0;
  const modalContent = document.querySelector(".product-modal-content");

  modal.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    currentX = 0;
    modalContent.style.transition = 'none';
  }, { passive: true });

  modal.addEventListener("touchmove", e => {
    currentX = e.touches[0].clientX - startX;
    // Solo aplicar transformación horizontal si el movimiento es principalmente horizontal
    if (Math.abs(currentX) > Math.abs(e.touches[0].clientY - startY)) {
      e.preventDefault();
      modalContent.style.transform = `translateX(${currentX}px)`;
    }
  }, { passive: false });

  modal.addEventListener("touchend", e => {
    modalContent.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    modalContent.style.transform = 'translateX(0)';

    const diff = currentX;
    const minSwipeDistance = 60;

    if (Math.abs(diff) > minSwipeDistance) {
      // Animación de salida
      modalContent.style.transform = `translateX(${diff > 0 ? 100 : -100}px)`;
      modalContent.style.opacity = '0';

      setTimeout(() => {
        if (diff > 0) {
          showAdjacentProduct(-1); // Swipe derecho -> producto anterior
        } else {
          showAdjacentProduct(1);  // Swipe izquierdo -> producto siguiente
        }

        // Resetear transformación para la nueva entrada
        modalContent.style.transform = `translateX(${diff > 0 ? -100 : 100}px)`;
        modalContent.style.opacity = '0';

        // Animación de entrada
        setTimeout(() => {
          modalContent.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
          modalContent.style.transform = 'translateX(0)';
          modalContent.style.opacity = '1';
        }, 50);
      }, 300);
    }
  }, { passive: true });
}

/* ---------- Función mejorada para cambiar producto ---------- */
function showAdjacentProduct(dir) {
  if (!currentProduct) return;

  const currentIndex = products.findIndex(p => p.id === currentProduct.id);
  const newIndex = (currentIndex + dir + products.length) % products.length;
  
  openProductModal(products[newIndex].id);
}

/* ---------- Modal producto actualizado ---------- */
function openProductModal(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return;

  currentProduct = p;
  
  // Usar solo la primera imagen
  const mainImage = p.imgs[0];

  // Actualizar contenido inmediatamente
  modalName.textContent = p.name;
  modalDesc.textContent = p.desc;
  modalPrice.textContent = formatMoney(p.price);
  carouselImage.src = mainImage;
  carouselImage.alt = p.name;

  qtyInput.value = 1;
  updateModalTotal();

  // Mostrar modal
  productModal.classList.remove('hidden');

  // Resetear transformación
  const modalContent = document.querySelector(".product-modal-content");
  modalContent.style.transform = 'translateX(0)';
  modalContent.style.opacity = '1';
}

/* ---------- Eliminar funciones de carrusel de imágenes ---------- */
// Remover estos event listeners anteriores:
// prevImgBtn.addEventListener('click', ...);
// nextImgBtn.addEventListener('click', ...);

// Y esta función:
// function enableCarouselSwipe() { ... }

function closeProductModal(){
  productModal.classList.add('hidden');
}

/* Carrusel */
// prevImgBtn.addEventListener('click', ()=>{
//   currentImgIndex = (currentImgIndex - 1 + currentProduct.imgs.length) % currentProduct.imgs.length;
//   carouselImage.src = currentProduct.imgs[currentImgIndex];
// });
// nextImgBtn.addEventListener('click', ()=>{
//   currentImgIndex = (currentImgIndex + 1) % currentProduct.imgs.length;
//   carouselImage.src = currentProduct.imgs[currentImgIndex];
// });

/* ---------- Modal total ---------- */
function updateModalTotal(){
  if(!currentProduct) return;
  const qty = Math.max(1, parseInt(qtyInput.value,10) || 1);
  const subtotal = qty * currentProduct.price;
  const cartTotal = state.cart.reduce((s,i)=>s + i.qty * i.price, 0);
  
  modalTotal.textContent = `Total actual (incluye carrito): ${formatMoney(subtotal + cartTotal)}`;
  
  modalCartLegend.textContent =
    state.cart.length > 0
      ? `Incluye ${formatMoney(cartTotal)} que ya tenés cargado.`
      : "";
}

/* Qty controls */
$('#qty-increase').addEventListener('click', ()=>{ qtyInput.value++; updateModalTotal(); });
$('#qty-decrease').addEventListener('click', ()=>{ qtyInput.value = Math.max(1, qtyInput.value-1); updateModalTotal(); });
qtyInput.addEventListener('input', ()=> updateModalTotal());

$('#close-product-modal').addEventListener('click', closeProductModal);

/* ---------- Carrito ---------- */
function saveCartStateUI(){
  $('#cart-count').textContent = state.cart.reduce((s,i)=>s + i.qty,0);
}

function addToCart(product, qty){
  const existing = state.cart.find(i=>i.id===product.id);
  if(existing) existing.qty += qty;
  else state.cart.push({ ...product, qty });

  persistCart();
  saveCartStateUI();
  renderCartItems();
}

/* Botón agregar */
$('#add-to-cart').addEventListener('click', ()=>{
  const qty = Math.max(1, parseInt(qtyInput.value,10) || 1);
  addToCart(currentProduct, qty);
  closeProductModal();
});

/* Comprar directo (solo ese producto) */
$('#buy-now').addEventListener('click', ()=>{
  const qty = Math.max(1, parseInt(qtyInput.value,10) || 1);
  goToWhatsApp(false, { ...currentProduct, qty });
});

/* ---------- Modal carrito ---------- */
const cartModal = $('#cart-modal');
const cartItemsWrap = $('#cart-items');

function openCartModal(){
  renderCartItems();
  cartModal.classList.remove('hidden');
}
function closeCartModal(){
  cartModal.classList.add('hidden');
}

$('#view-cart-btn').addEventListener('click', openCartModal);
$('#close-cart-modal').addEventListener('click', closeCartModal);

/* Render items */
function renderCartItems(){
  cartItemsWrap.innerHTML = '';

  if(state.cart.length === 0){
    cartItemsWrap.innerHTML = '<p style="color:var(--muted)">Tu carrito está vacío</p>';

    // Resetear totales del popup
    $('#cart-subtotal').textContent = formatMoney(0);
    $('#cart-total-qty').textContent = 0;

    return;
    }


  state.cart.forEach((item, idx)=>{
    const prod = products.find(p=>p.id===item.id);
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img class="thumb" src="${prod.imgs[0]}" alt="${item.name}">
      <div class="info">
        <strong>${item.name}</strong>
        <small>${item.qty} × ${formatMoney(item.price)} = ${formatMoney(item.qty * item.price)}</small>
      </div>
      <button class="remove btn small" data-idx="${idx}">Eliminar</button>
    `;
    cartItemsWrap.appendChild(row);
  });

  const subtotal = state.cart.reduce((s,i)=>s + i.qty * i.price, 0);
  $('#cart-subtotal').textContent = formatMoney(subtotal);
  const totalQty = state.cart.reduce((s,i)=>s + i.qty, 0);
  $('#cart-total-qty').textContent = totalQty;

}

/* Eliminar */
cartItemsWrap.addEventListener('click', (e)=>{
  const btn = e.target.closest('.remove');
  if(!btn) return;
  const idx = Number(btn.dataset.idx);
  state.cart.splice(idx,1);
  persistCart();
  renderCartItems();
  saveCartStateUI();
});

/* Vaciar */
$('#clear-cart').addEventListener('click', ()=>{
  if(confirm('Vaciar el carrito?')){
    state.cart = [];
    persistCart();
    renderCartItems();
    saveCartStateUI();
  }
});

/* ---------- WhatsApp ---------- */
const WHATSAPP_NUMBER = "5491151389953"; // Poné tu número sin + si querés

function buildWhatsAppMessage(fromCart=false, single=null){
  let lines = [];

  if(fromCart){
    state.cart.forEach(it=>{
      lines.push(`${it.qty} x ${it.name}`);
    });
  } else {
    lines.push(`${single.qty} x ${single.name}`);
  }

  const total = fromCart
    ? state.cart.reduce((s,i)=>s + i.qty * i.price, 0)
    : single.qty * single.price;

  lines.push(`Total a pagar: ${formatMoney(total)}`);
  return encodeURIComponent("Hola, quisiera comprar:\n" + lines.join("\n"));
}

function goToWhatsApp(fromCart=false, single=null){
  if(fromCart && state.cart.length === 0){
    alert("El carrito está vacío");
    return;
  }
  const msg = buildWhatsAppMessage(fromCart, single);
  const base = "https://wa.me/";

  window.location.href = WHATSAPP_NUMBER
    ? `${base}${WHATSAPP_NUMBER}?text=${msg}`
    : `${base}?text=${msg}`;
}
/* ---------- Cerrar modal al hacer clic fuera ---------- */
productModal.addEventListener('click', (e) => {
  if (e.target === productModal) {
    closeProductModal();
  }
});

cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    closeCartModal();
  }
});

$('#checkout').addEventListener('click', ()=> goToWhatsApp(true));

/* ---------- Init ---------- */
renderProducts();
saveCartStateUI();
renderCartItems();
enableProductSwipe(); // <- Agregar esta línea
