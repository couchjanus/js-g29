const caroselTemplate = document.createElement('template');

caroselTemplate.innerHTML = `
<style>

.carousel {
    align-items: center;
    background: #fff;
    display: flex;
    justify-content: center;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-250px * 7));
    }
  }
  
  .slider {
    background: white;
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.125);
    height: 100px;
    margin: auto;
    overflow: hidden;
    position: relative;
    width: 960px;
  }
  
  .slider::before, .slider::after {
    background: linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 100%);
    content: "";
    height: 100px;
    position: absolute;
    width: 200px;
    z-index: 2;
  }
  
  .slider::after {
    right: 0;
    top: 0;
    transform: rotateZ(180deg);
  }
  
  .slider::before {
    left: 0;
    top: 0;
  }
  
  .slider .slide-track {
    animation: scroll 40s linear infinite;
    display: flex;
    width: calc(250px * 14);
  }
  
  .slider .slide {
    height: 100px;
    width: 250px;
  }
  
  .slider .slide img {
      display: block;
      height: 100px;
      width: 250px;
      object-fit: cover;
  }
  
  
  /* category */
  .category-item {
      display: block;
      position: relative;
  }
    
  .category-item img {
      transition: all 0.3s;
  }
    
  .category-item-title {
      display: inline-block;
      padding: 0.5rem 1rem;
  
      color: #343a40;
      background: #fff;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.07em;
  
      position: absolute;
      top: 50%;
      left: 50%;
  
      transform: translate(-50%, -50%);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.07);
    
  }
    
  .category-item:hover img {
      opacity: 0.7;
  }
  
</style>
<div class="carousel">
    <div class="slider">
        <div class="slide-track">
        </div>
    </div>
</div>
`;


const carouselItemTemplate = item => `<div class="slide carousel-item">
<a class="category-item" href="#!" data-category="${item.id}">
  <img src="https://couchjanus.github.io/images/product-${item.id}.jpg" alt="${item.name}" height="100" with="250">
  <strong class="category-item category-item-title" data-category="Electronic">${item.name}</strong>
</a>
</div>`;

class Carousel extends HTMLElement {
    constructor() {
        super();
        this.setupShadow();
    }

    setupShadow() {
        this.shadow = this.attachShadow({mode: 'open'});
        const template = caroselTemplate.content;
        this.shadow.appendChild(template.cloneNode(true));

    }

    connectedCallback() {
        
        this.setupCarousel();
    }

    async fetchData(url) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            return response.json()

        }
        catch (e) {
            return null;
        }
    }

    setupCarousel() {
        const container = this.shadow.querySelector('.slide-track');
        
        const url = 'https://my-json-server.typicode.com/couchjanus/db/categories';

        ( async () => {
            let categories =  await this.fetchData(url);
            let res = ''
            const arr1 = categories.slice(0,7);

            const arr2 = arr1.concat(categories.slice(0,7));

            arr2.forEach(item => res += carouselItemTemplate(item));
            container.innerHTML = res;     
        })()
    }
}

customElements.define('carousel-component', Carousel);