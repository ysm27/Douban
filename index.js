const PAGE = {
  init: function(){
    this.bind();
  },
  bind: function(){
    $('.img').on('click',this.showInfo);
  },
  // XHR 方法
  showInfo: function(){
    let index = this.dataset.index;
    PAGE._XHR('GET',`https://www.jevescript.com/api/isbn/${index}`,{},(res) => {
      let author = res.data.author;
      let image = res.data.image;
      let title = res.data.title;
      let publisher = res.publisher;
      let pubdate = res.data.pubdate;
      let price = res.data.price;
      let isbn = res.data.isbn13;
      let binding = res.data.binding;
      let bookDetail = document.getElementById('book-detail');
      bookDetail.innerHTML = `
        <div class="book-title">${title}</div>
        <div class="mainer">
          <img class="book-img" src='${image}'>
          <div class="book-info" id="book-info">
            <div class="book-author">作者：${author}</div>
            <div class="book-publisher">出版社：${publisher}</div>
            <div class="book-pubdate">出版年：${pubdate}</div>
            <div class="book-binding">装帧：${binding}</div>
            <div class="book-price">定价：${price}</div>
            <div class="book-isbn">ISBN：${isbn}</div>
          </div>
        </div>  `
    })
  },
  _XHR: function(method,url,datas,success,progress,error,csrf){
    let xhr = new XMLHttpRequest();
    xhr.open(method,url,true);
    if(csrf){
      xhr.withCredentials = true;
      xhr.setRequestHeader('X-CSRF-TOKEN',csrf);
    }
    let formData;
    if(datas['form-data']){
      formData = new FormData();
      for(let key in datas){
        formData.append(key,datas[key]);
      }
      datas = formData;
    }else{
      formData = JSON.stringify(datas);
      xhr.setRequestHeader('content-type','application/json')
    }
    xhr.upload.onprogress = function(event){
      typeof progress === 'function' && progress(event);
    };
    xhr.onerror = function(xhr,status,text){
      typeof error === 'function' && error(xhr,status,text);
    };
    xhr.onreadystatechange = function(response){
      if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != ''){
        typeof success === 'function' && success(JSON.parse(xhr.response))
      }else if(xhr.status != 200 && xhr.responseText){
        typeof error === 'function' && error(xhr,xhr.status,xhr.responseText)
      }
    };
    xhr.send(formData);
  }

  // jQuery $.ajax
  // showInfo: function(){
  //   let index = this.dataset.index;
  //   $.ajax({
  //     type: 'GET',
  //     url: `https://www.jevescript.com/api/isbn/${index}`,
  //     data: {},
  //     success: (res) => {
  //       let author = res.data.author;
  //       let image = res.data.image;
  //       let title = res.data.title;
  //       let publisher = res.publisher;
  //       let pubdate = res.data.pubdate;
  //       let price = res.data.price;
  //       let isbn = res.data.isbn13;
  //       let binding = res.data.binding;
  //       let bookDetail = document.getElementById('book-detail');
  //       bookDetail.innerHTML = `
  //         <div class="book-title">${title}</div>
  //         <div class="mainer">
  //           <img class="book-img" src='${image}'>
  //           <div class="book-info" id="book-info">
  //             <div class="book-author">作者：${author}</div>
  //             <div class="book-publisher">出版社：${publisher}</div>
  //             <div class="book-pubdate">出版年：${pubdate}</div>
  //             <div class="book-binding">装帧：${binding}</div>
  //             <div class="book-price">定价：${price}</div>
  //             <div class="book-isbn">ISBN：${isbn}</div>
  //           </div>
  //         </div>  `
  //     }
  //   })
  // }

  // fetch方法
  // showInfo: async function(){
  //   let index = this.dataset.index;
  //   let url = `https://www.jevescript.com/api/isbn/${index}`;
  //   let infoFetch = await fetch(url)
  //     .then((response) => response.json());
  //     let author = infoFetch.data.author;
  //     let image = infoFetch.data.image;
  //     let title = infoFetch.data.title;
  //     let publisher = infoFetch.data.publisher;
  //     let pubdate = infoFetch.data.pubdate;
  //     let price = infoFetch.data.price;
  //     let isbn = infoFetch.data.isbn13;
  //     let binding = infoFetch.data.binding;
  //     let bookDetail = document.getElementById('book-detail');
  //     bookDetail.innerHTML = `
  //       <div class="book-title">${title}</div>
  //       <div class="mainer">
  //         <img class="book-img" src='${image}'>
  //         <div class="book-info" id="book-info">
  //           <div class="book-author">作者：${author}</div>
  //           <div class="book-publisher">出版社：${publisher}</div>
  //           <div class="book-pubdate">出版年：${pubdate}</div>
  //           <div class="book-binding">装帧：${binding}</div>
  //           <div class="book-price">定价：${price}</div>
  //           <div class="book-isbn">ISBN：${isbn}</div>
  //         </div>
  //       </div>  `
  // }

    // axio方法
  // showInfo: function(){
    // let index = this.dataset.index;
    // let url = `https://www.jevescript.com/api/isbn/${index}`
    // axios.get(url)
    //   .then (res => {
    //     let author = res.data.data.author;
    //     let image = res.data.data.image;
    //     let title = res.data.data.title;
    //     let publisher = res.data.data.publisher;
    //     let pubdate = res.data.data.pubdate;
    //     let price = res.data.data.price;
    //     let isbn = res.data.data.isbn13;
    //     let binding = res.data.data.binding;
    //     let bookDetail = document.getElementById('book-detail');
    //     bookDetail.innerHTML = `
    //       <div class="book-title">${title}</div>
    //       <div class="mainer">
    //         <img class="book-img" src='${image}'>
    //         <div class="book-info" id="book-info">
    //           <div class="book-author">作者：${author}</div>
    //           <div class="book-publisher">出版社：${publisher}</div>
    //           <div class="book-pubdate">出版年：${pubdate}</div>
    //           <div class="book-binding">装帧：${binding}</div>
    //           <div class="book-price">定价：${price}</div>
    //           <div class="book-isbn">ISBN：${isbn}</div>
    //         </div>
    //       </div>  `
    //   })
  // },
}
PAGE.init();