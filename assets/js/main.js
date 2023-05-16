/**
 * Template Name: FlexStart
 * Updated: Mar 10 2023 with Bootstrap v5.2.3
 * Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
;(function () {
  'use strict'

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  )
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  )

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach((e) => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth',
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on(
    'click',
    '.navbar .dropdown > a',
    function (e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    },
    true
  )

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    'click',
    '.scrollto',
    function (e) {
      if (select(this.hash)) {
        e.preventDefault()

        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    },
    true
  )

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  })

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120,
      },
    },
  })

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    })
  }
  window.addEventListener('load', () => {
    aos_init()
  })

  /**
   * Initiate Pure Counter
   */
  new PureCounter()
})()

// Function to fetch Wikipedia content
async function fetchWikipediaContent() {
  const searchTerms = document.getElementById('search-input').value.split(',') // Split the search input by comma
  const contentContainer = document.getElementById('content-container')

  // Clear previous content
  contentContainer.innerHTML = ''

  try {
    for (const searchTerm of searchTerms) {
      const apiUrl = `https://ka.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        searchTerm
      )}`
      const response = await fetch(apiUrl)
      const data = await response.json()

      // Display Wikipedia content
      displayWikipediaContent(data)
    }
  } catch (error) {
    console.log('Error fetching Wikipedia content', error)
  }
}

// Function to display Wikipedia content
function displayWikipediaContent(data) {
  const contentContainer = document.getElementById('content-container')

  if (data.title && data.extract) {
    // Display content with typing animation
    const title = document.createElement('h2')
    title.classList.add('typing-animation')
    title.classList.add('wiki-title')
    contentContainer.appendChild(title)

    const extract = document.createElement('p')
    extract.classList.add('wiki-info')
    extract.classList.add('typing-animation-two')
    contentContainer.appendChild(extract)

    // Start typing animation for title
    animateTyping(data.title, title)

    // Start typing animation for extract
    animateTyping(data.extract, extract)
  } else {
    // Display custom message when content is not found
    const notFoundMessage = document.createElement('h6')
    notFoundMessage.classList.add('opacity-animation')
    contentContainer.appendChild(notFoundMessage)
    notFoundMessage.textContent =
      'სამწუხაროდ თქვენი მოთხოვნა ვერ დამუშავდა. შეამოწმეთ რამდენად სწორად დაწერეთ სიტყვა, ან იქნებ სხვა შესატყვისი გამოიყენოთ?'

    // Start typing animation for title
    animateTyping(notFoundMessage.textContent, notFoundMessage)
  }
}

// Function to animate typing effect
function animateTyping(text, element) {
  let counter = 0
  const typingInterval = setInterval(() => {
    element.textContent += text[counter]
    counter++
    if (counter === text.length) {
      clearInterval(typingInterval)
    }
  }, 25)
}

const searchTerm = document.getElementById('search-input')

// Search keydown
searchTerm.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    fetchWikipediaContent()
  }
})
