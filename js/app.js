
  let data = {
  "1" : {
    "name" :"Kadhai Paneer",
    "image" : "16457.jpg",
    "price" : "135",
  },
  "2" : {
    "name" :"Shahi Paneer",
    "image" : "51990.jpg",
    "price" : "120"
  },
  "3" : {
    "name" :"Paneer Butter Masala",
    "image" : "11813.jpg",
    "price" : "180"
  },
  "4" : {
    "name" :"Muttar Paneer",
    "image" : "47823.jpg",
    "price" : "120"
  },
  "5" : {
    "name" :"Palak Paneer",
    "image" : "76856.jpg",
    "price" : "135"
  },
  "6" : {
    "name" :"Muttar Mushroom",
    "image" : "12160.jpg",
    "price" : "135"
  },
  "7" : {
    "name" :"Soya Chaap Masala",
    "image" : "62579.jpg",
    "price" : "120"
  },
  "8" : {
    "name" :"Chana Masala",
    "image" : "65611.jpg",
    "price" : "120"
  }

}
//

  let l;
  let dish = [];
  let dishobj = {};
  let appendData = '';
  for(l in data){
    appendData +='<div class="col-md-3 p-0 "> <div class="menucategitem"> <div class="itemimg"> <div class="addingdiv1 text-center" id="'+l+'"> <span class="plus-sign"><img src="img/already.png"></span> </div><div class="addingdiv text-center dish-add" price="'+data[l].price+'" dish="'+data[l].name+'" type="0" dish-id="'+l+'" sr="img/'+data[l].image+'"> <div class="row m-0"> <div class="col-md-12 p-0"> <img src="img/halffull2.png"> </div></div></div><img alt="spiceegarden" class="img-responsive test" src="img/'+data[l].image+'"> </div><h3><i class="fa fa-dot-circle-o vegs"></i>&nbsp; '+data[l].name+'</h3> <div class="row"> <div class="col-md-6"> <span class="pull-left p-l-10"><i class="fa fa-circle" aria-hidden="true"></i> $ '+data[l].price+'</span> </div></div></div></div>';
  }
  document.getElementById('all-data').innerHTML = appendData;
  let dishlist = JSON.parse(localStorage.getItem("dish"));
  
    if(dishlist != null){
     dish = dishlist;
    }
   
  
  let i=0;

  let getdish = document.getElementsByClassName('dish-add'); //get object
  let deletedish;
  
  window.chanageqty = function(e){
            let id = e.getAttribute('dish-id');
              let quantity = parseInt(e.value);
              let price = parseInt(e.getAttribute('price'));
              let total_price = parseInt(document.getElementById('total-price').textContent);
              let price_plus = quantity*price;
              let price_minus = parseInt(document.querySelector('.price_'+id).textContent);
              document.querySelector('.price_'+id).textContent = price_plus;    
              total_price = total_price-price_minus;
              total_price = total_price+price_plus;

              document.getElementById('total-price').textContent = total_price;
          }
  
  
  for (let m = 0; m < getdish.length; m++) {

      getdish[m].addEventListener('click', function() {
          let price = parseInt(this.getAttribute('price'));
          let name = this.getAttribute('dish')
          let typeno = this.getAttribute('type')
          let src = this.getAttribute('sr')
          let id = this.getAttribute('dish-id')
          dish.push(id);
          
          let total_price = parseInt(document.getElementById('total-price').textContent);
          total_price = total_price+price;
          document.getElementById('total-price').textContent = total_price;
          
          let  type = '';
          if(typeno == '0'){
            type = 'fa fa-dot-circle-o vegs pull-right';
          }else{
            type = 'fa fa-dot-circle-o nonvegs pull-right';
          }
          let append = '<div class="cart-items" id="delete_cart_'+id+'" get-order="'+id+'"><div class="del-item-div"  price="'+price+'" dish-id="'+id+'"><i class="fa fa-close del-item"></i></div><div class="cartitemr1"><img src="'+src+'"><span>'+name+'</span><i class="'+type+'"></i></div><div class="cartitemr2"><input type="number" onchange="chanageqty(this);" class="quantity" dish-id="'+id+'" value="1" min="1" price="'+price+'" name="data['+i+'][quantity]"><input type="hidden" name="data['+i+'][dish_id]" value="'+id+'"><input type="hidden" name="data['+i+'][dish]" value="'+name+'"><input type="hidden" name="data['+i+'][price]" value="'+price+'"> &nbsp;&nbsp;&nbsp; x &nbsp;&nbsp;&nbsp;<span>Rs.'+price+'</span>&nbsp;&nbsp;&nbsp; = &nbsp;&nbsp;&nbsp;Rs.<span class="pull-right m-t-15 price_'+id+'">'+price+'</span></div></div>';
          document.getElementById('order-list').innerHTML +=append;    
          document.getElementById(id).style.display = 'block'; 

          deletedish = document.getElementsByClassName('del-item-div');

          for (let n = 0; n < deletedish.length; n++) {
            deletedish[n].addEventListener('click', function() {
              let id = this.getAttribute('dish-id');
              let price_minus = parseInt(document.querySelector('.price_'+id).textContent);
              let total_price = parseInt(document.getElementById('total-price').textContent);
              total_price = total_price-price_minus;
              document.getElementById('total-price').textContent = total_price;
              let index = dish.indexOf(id);
              if (index > -1) {
                  dish.splice(index, 1);
              }
              localStorage.setItem("dish", JSON.stringify(dish));
              //document.getElementById('cart-count').textContent = dish.length;
              document.getElementById(id).style.display = 'none'; 
              let elem = document.getElementById('delete_cart_'+id);
              document.getElementById('order-list').removeChild(elem);
              });
          }  
           
      });
  }
  
  
  document.getElementById('getfav').addEventListener('click',function(){
    let ls = JSON.parse(localStorage.getItem("dish"));
    //console.log(ls);
    let favlist = '';
    let gtotal = 0;
    let overlay = document.getElementsByClassName('addingdiv1');
    
    for(let c=0;c<overlay.length;c++){
      
      overlay[c].style.display = "none";
    }
    for(let j=0;j<ls.length;j++){
      //console.log(ls[j]);
      let elem = data[ls[j]];
      favlist +='<div class="cart-items" id="delete_cart_'+ls[j]+'" get-order="'+ls[j]+'"><div class="del-item-div" price="'+elem.price+'" dish-id="'+ls[j]+'"><i class="fa fa-close del-item"></i></div><div class="cartitemr1"><img src="img/'+elem.image+'"><span>'+elem.name+'</span><i class="fa fa-dot-circle-o vegs pull-right"></i></div><div class="cartitemr2"><input type="number" onchange="chanageqty(this);" class="quantity" dish-id="'+ls[j]+'" value="1" min="1" price="'+elem.price+'" > &nbsp;&nbsp;&nbsp; x &nbsp;&nbsp;&nbsp;<span>Rs.'+elem.price+'</span>&nbsp;&nbsp;&nbsp; = &nbsp;&nbsp;&nbsp;Rs.<span class="pull-right m-t-15 price_'+ls[j]+'">'+elem.price+'</span></div></div>';
      document.getElementById('order-list').innerHTML = favlist;
      gtotal +=parseInt(elem.price);
      document.getElementById(ls[j]).style.display = 'block'; 
      deletedish = document.getElementsByClassName('del-item-div');

          for (let n = 0; n < deletedish.length; n++) {
            deletedish[n].addEventListener('click', function() {
              let id = this.getAttribute('dish-id');
              let price_minus = parseInt(document.querySelector('.price_'+id).textContent);
              let total_price = parseInt(document.getElementById('total-price').textContent);
              total_price = total_price-price_minus;
              document.getElementById('total-price').textContent = total_price;
              let index = dish.indexOf(id);
              if (index > -1) {
                  dish.splice(index, 1);
              }
              localStorage.setItem("dish", JSON.stringify(dish));
              //document.getElementById('cart-count').textContent = dish.length;
              document.getElementById(id).style.display = 'none'; 
              let elem = document.getElementById('delete_cart_'+id);
              document.getElementById('order-list').removeChild(elem);
              });
          }  
      
    }
    document.getElementById('total-price').textContent = gtotal;
  })
  
  document.getElementById('fav').addEventListener('click',function(){
    localStorage.setItem("dish", JSON.stringify(dish));
  });
  document.getElementById('submit-btn').addEventListener('click',function(){
    document.getElementById('order-wrap').style.display='none';
    document.getElementById('dish-div').style.display='none';
  });