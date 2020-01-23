 const davinci = {
    portrait : {
      img_src : "https://9zptma.ch.files.1drv.com/y4manHIy3befXE3DRcxYnwyULX39_oEP8pjiw455b8-vBQFYvlq3cQDaWBQQqlF8Ptxy60MVHYNWobhZDChFkDuJMKWsMuEX0M02bFQon1LMGZ8ECWJpCg_l_6EckLzgDc8xNJGn7mv9yiJE8FALnzKsSBxCnwFsKsIEPhAIemyStkc7r4APRxgFrDO2ow_DLN328jpHXB5mGeRlh_jEHKtGQ?width=691&height=900&cropmode=none",
      img_text : "Leonardo di ser Piero da Vinci<br>(15 April, 1452 - 2 May, 1519)"
    },
    article : {
      p1 : "Leonardo da Vinci is probably most known for his art work and considered by many to be a man before his time. The truth is, Leonardo was not a prolific painter. He was the epitome of a polymath, to say the least.",
      p2 : "Da Vinci was epically curious about the world around him and documented this in his notepads with sketches of observations and thoughts loosely organized around four themes – painting, architecture, mechanics, and human anatomy. It is widely believed that he had to hide his research by writing in code to avoid being detected by an arcane ideology fearful of knowledge, wizardry and blasphemy, afraid of being labeled a heretic. Others contend his “backward” writing was a result of him being left-handed and so he used a mirror, making it easier to write.<sub>1</sub>",
      p3 : "Among his array of interests were music, metallurgy, science, religion, astronomy, mathematics, and engineering. He studied anatomy, botany, geology, zoology, hydraulics, aeronautics and physics. At times his sketches seemed to show the future, what we now recognize as bicycles, helicopters, a flying machine and even a submarine.",
      p4 : "The mystery of Leonardo da Vinci, a visionary, a genius, an inventor, a man before his time? However the world perceives him he will forever be known as, Renaissance Man."
    },
    section : {
      title : "The life and death of Leonardo: <span><sub>2</sub></span>", 
      magi  : "https://en.wikipedia.org/wiki/Adoration_of_the_Magi_(Leonardo)",
      supper: "https://en.wikipedia.org/wiki/The_Last_Supper_(Leonardo_da_Vinci)",
      mona  : "https://en.wikipedia.org/wiki/Mona_Lisa",
      node  : " on a wall in the Santa Maria delle Grazie. The project took Leo three years to complete",
      list  : [
        {1452 : "Born in Vinci, Italy on April 15th"},
        {'void' : "Leonardo receives little formal education in his formative years beyond basic reading, writing and mathematics instruction"},
        {1466 : "14 years after his birth Leo begins an apprenticeship with the notorious, Andrea del Verrocchio in Florence. While under the expert tutelage of Verrocchio, Leo fine-tunes his technical skills"},
        {1472 : "At the age of 20, Leo qualified for membership as a Master Artist in Florence's Guild of Saint Luke and opens his own workshop. Although, he continues to work with his teacher for another 5 years"},
        {1473 : "His earliest known painting is a sketch of the landscape in Arno valley"},
        {1476 : "Court records show Leo and four other young men charged with sodomy. A crime punishable by exile or death, da Vinci is later acquitted"},
        {1478 : "Leo receives his first commission for an altarpiece to reside in a chapel in Florence's Palazzo Vecchio"},
        {1481 : "The Augustinian monks of Florence's San Donato a Scopeto task Leo with painting the "},
        {1482 : "Da Vinci pens a letter to the future Duke of Milan, Ludovico Sforza, requesting a job. Instead of flouting his skills as a painter, Leo markets himself as a military engineer sending sketches of war machines. The letter works and Leo spends the next 17 years working for Ludovico"},
        {1495 : 'Ludovico commissioned da Vinci to paint '},
        {'1502-1503' : "Worked as a Military engineer for Cesare Borgia, the illegitimate son of Pope Alexander VI and commander of the Papal Army"},
        {1503 : "Leonardo paints his last, and arguably, the most famous painting in the world, " },
        {1506 : "Leo returns to Milan to work for the French rulers who defeated Ludovico in 1499"},
        {1515 : 'Da Vinci is given the title, "Premier Painter and Engineer and Architect to the King"'},
        {1519 : "May 2, Leonardo da Vinci passes away at the age of 67. His last known commissioned project is a mechanical lion that could walk and open its chest to reveal a bouquet of lilies"}
      ]
    },
    quotes : {
      quote : "<q>Learning never exhausts the mind</q><br>- <em>Leonardo da Vinci <span><sub>3</sub></span></em>",
      node : "Leonardo da Vinci <span><sub>3</sub></span>"
    },
    aside : {
      links : [
         "http://www.unmuseum.org/leocode.htm",
         "http://www.biography.com/people/leonardo-da-vinci-40396#the-last-supper",
         "http://www.brainyquote.com/quotes/authors/l/leonardo_da_vinci.html"
      ],
      titles : [
        "The Secret of Leonardo Da Vinci",
        "The Biography of Leonardo da Vinci",
        "Brainy Quotes"
        ],
      resources : [
        "http://www.leonardodavinci.net/self-portrait.jsp",
        "https://en.wikipedia.org/wiki/Leonardo_da_Vinci"
        ]
    }
  };
  
  function create(tag) {
    return document.createElement(tag);
  }
  
  function setFontSize(w) {
    let size;
    if(w >= 1081) {
      size = '22px';
    } else
    if(w >= 641 && w <= 1080) {
      size = '18px';
    } else
    if(w < 641) {
      size = '14px';
    }  
    
    body[0].style.fontSize = size;
  }
  
  function viewport() {
    let docElement = document.documentElement,
        viewport;
    
    if(typeof window.innerWidth !== 'undefined') {
      viewport = window.innerWidth;
    } else 
    if (typeof docElement != 'undefined'
        && typeof docElement.clientWidth != 'undefined'
        && typeof docElement.clientWidth != 0
       ) {
      viewport = document.documentElement.clientWidth;
    } else {
      viewport = body[0].clientWidth;
    }
    return setFontSize(viewport);
  }
  
  function detectIE() {
    let ua = window.navigator.userAgent;
    
    let msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
  
    let trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      let rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
  
    let edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
  
    // other browser
    return false;  
  }
  
  function polyfillForIE(element, string) {
    console.log(element)
    (function (arr) {
      arr.forEach(function (item) {
        if (item.hasOwnProperty('append')) {
          return;
        }
        Object.defineProperty(item, 'append', {
          configurable: true,
          enumerable: true,
          writable: true,
          value: function append() {
            var argArr = Array.prototype.slice.call(arguments),
              docFrag = document.createDocumentFragment();
  
            argArr.forEach(function (argItem) {
              var isNode = argItem instanceof Node;
              docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
            });
  
            this.appendChild(docFrag);
          }
        });
      });
    })([Element.prototype, Document.prototype, DocumentFragment.prototype]);
  }
  
  const body = document.getElementsByTagName('BODY'),
        root = create('DIV');
        root.setAttribute('id', 'main');
        body[0].appendChild(root);

  const header = create('HEADER'),
        h_h1   = create('H1'),
        h_h3   = create('H3');
  
        root.appendChild(header);
        header.appendChild(h_h1);
        header.appendChild(h_h3);
        h_h1.innerHTML = 'Leonardo da Vinci';
        h_h3.innerHTML = '<em>Renaissance Man</em>';
  
  const portrait = create('DIV'),
        p_image  = create('IMG'),
        p_parag  = create('P');
  
        root.appendChild(portrait);
        portrait.appendChild(p_image);
        portrait.appendChild(p_parag);
        portrait.setAttribute('id', 'portrait');
        portrait.setAttribute('class', 'img-rounded');
        p_image.setAttribute('class', 'img-rounded');
        p_image.setAttribute('src', davinci.portrait.img_src);
        p_image.setAttribute('alt', 'Leonardo da Vinci');
        p_image.setAttribute('width', '100%');
        p_image.setAttribute('height', '100%');
        p_parag.setAttribute('id', 'portrait-info');
        p_parag.innerHTML = davinci.portrait.img_text;
        
  const article = create('ARTICLE'),
        p_1     = create('P'),
        p_2     = create('P'),
        p_3     = create('P'),
        p_4     = create('P');
  
        root.appendChild(article);
        article.appendChild(p_1);
        article.appendChild(p_2);
        article.appendChild(p_3);
        article.appendChild(p_4);
        p_1.innerHTML = davinci.article.p1;
        p_2.innerHTML = davinci.article.p2;
        p_3.innerHTML = davinci.article.p3;
        p_4.innerHTML = davinci.article.p4;
  
  const section = create('SECTION'),
        sec_h3  = create('H3'),
        sec_ul  = create('UL');
  
        root.appendChild(section);
        section.appendChild(sec_h3);
        section.appendChild(sec_ul);
        sec_h3.innerHTML = davinci.section.title;
  
        let arr = davinci.section.list;
        for(let i = 0; i < arr.length; i++) {
          let key    = Object.keys(arr[i]), 
              li     = create('LI'),
              strong = key[0] !== 'void'? "<strong>" + key + "</strong> - " : "";
          
          sec_ul.appendChild(li);
          li.innerHTML = strong + arr[i][key];
          
          if(key[0] === "1481" || key[0] === "1495" || key[0] === "1503") {
            let link = create('A');
            link.setAttribute('title',  'Wikipedia');
            link.setAttribute('target', '_self');
            link.setAttribute('rel',    'external, noreferrer');
            li.appendChild(link);
            
            if(key[0] === "1481") {
              link.setAttribute('href', davinci.section.magi);
              link.innerHTML = ' Adoration of Magi';
            } else if(key[0] === "1495") {
              link.setAttribute('href', davinci.section.supper);
              link.innerHTML = 'The Last Supper';
              // .append doesn't work with IE
              if(detectIE()) {
                //polyfillForIE(li, davinci.section.node);
                li.insertAdjacentText("beforeEnd", davinci.section.node);
              } else {
                li.append(davinci.section.node);
              }
            
            } else {
              link.setAttribute('href', davinci.section.mona);
              link.innerHTML = ' Mona Lisa';
            }
          }       
        }
  
  const quote = create('H3'),
        q     = create('Q'),
        br    = create('BR'),
        em    = create('EM');
  
        root.appendChild(quote);
        quote.appendChild(q);
        quote.setAttribute('class', 'quote');
        q.innerHTML = davinci.quotes.quote;
  
  const aside  = create('ASIDE'),
        as_h3  = create('H3'),
        as_ol  = create('OL'),
        as_h4  = create('H4'),
        as_div = create('DIV'),
        as_p1  = create('P'),
        as_p2  = create('P'),
        as_a1  = create('A'),
        as_a2  = create('A');
  
        root.appendChild(aside);
        aside.appendChild(as_h3);
        as_h3.setAttribute('class', 'reference');
        as_h3.innerHTML = 'References';
        aside.appendChild(as_ol);
  
        let arr_links = davinci.aside.links,
            arr_titles = davinci.aside.titles;
        
        for(let i = 0; i < arr_links.length; i++) {
          let list = create('LI'),
              link = create('A');
          as_ol.appendChild(list);
          list.appendChild(link);
          link.setAttribute('href', arr_links[i]);
          link.setAttribute('target', '_self');
          link.setAttribute('rel', 'external, noreferrer');
          link.setAttribute('title', arr_links[i]);
          link.innerHTML = arr_titles[i];
          link.style.textDecoration = "none";
        }
  
        aside.appendChild(as_h4);
        as_h4.setAttribute('class', 'resources');
        as_h4.innerHTML = 'additional resources:';
        aside.appendChild(as_div);
        as_div.setAttribute('class', 'resource-links');
        as_div.appendChild(as_p1);
        as_div.appendChild(as_p2);
        
        let arr_resources = davinci.aside.resources;
        for(let i = 0; i < arr_resources.length; i++) {
          let link = create('A');
          
          i === 0 ? as_p1.appendChild(link)  
                  : as_p2.appendChild(link);
  
          link.setAttribute('href', arr_resources[i]);
          link.setAttribute('target', '_self');
          link.setAttribute('rel', 'external, noreferrer');
          link.innerHTML = arr_resources[i];
          link.style.textDecoration = "none";
        }
        
  /***** CSS Styles *****/
  viewport();
  window.addEventListener('resize', function() {viewport()});
  
  // css styles for body
  body[0].style.fontFamily = "Linux, Libertine, Georgia, Times";
  body[0].style.backgroundColor = "whitesmoke";/*"#F5F5DC";*/
  body[0].style.color = "#212529";
  body[0].style.padding = "0";
  body[0].style.margin = "0";
  
  
  // css styles for #main
  root.style.backgroundColor = "#F5F5DC";
  root.style.maxWidth = "36em";
  root.style.padding = ".25em .625em";
  root.style.height = "100%";
  root.style.marginLeft = "auto";
  root.style.marginRight= "auto";
  root.style.border = "1px solid #337ab7"
  
  // css styles for header
  header.style.textAlign = "center";
  h_h1.style.color = "#007bff";
  h_h1.style.marginTop = "0";
  h_h3.style.marginTop = "-1em";
  h_h3.style.fontWeight = "500";
  
  // css styles for portrait
  portrait.style.backgroundColor = "#337ab7";
  portrait.style.padding = ".625em";
  portrait.style.marginTop = "-1em";
  portrait.style.paddingBottom = "0";
  portrait.style.maxWidth = "25em";
  portrait.style.marginLeft = "auto";
  portrait.style.marginRight = "auto";
  portrait.style.borderRadius = ".625em";
  p_parag.style.color = "white";
  p_parag.style.marginTop = "0";
  p_parag.style.textAlign = "center";
  p_parag.style.paddingBottom = ".625em";
  
  // css styles for quote
  quote.style.textAlign = "center";
  quote.fontWeight = "500";
        
  // css styles for aside
  as_h4.style.fontWeight = "500";
  as_div.style.marginTop = "-.75em";
  as_div.style.marginLeft = "1.65em";
  as_div.style.fontSize = ".85em"
  as_p2.style.marginTop = "-.85em";
  
  // css styles for li elements
  let li = document.getElementsByTagName('LI');
  for(let i = 0; i < li.length; i++) {
    li[i].style.lineHeight = "130%";
  }  