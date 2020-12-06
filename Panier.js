module.exports = class Panier {
    items;

    
      getNbItems(){ return this.items.length; }
      //getPrixHT= function(){};
      viderPanier(){
        this.items = new Array();
      }

      toHtml(){
        let html = "";
        let totalHt = 0;
        for (let i in this.items){
          html += '<div><span><a href="removeItem?id='+this.items[i].id+'">x</a></span><img src="/img/'+this.items[i].nom+'.png"><h4>'+this.items[i].nom+'</h4><span class="prix">'+ this.items[i].prix +'</span></div>';
          totalHt += parseFloat(this.items[i].prix);
        }
        let totalTTC = totalHt*1.14975;
        html += '<div class="prixG"><strong>Total HT</strong>: '+ totalHt.toFixed(2) +'<br/>';
        html += '<strong>Total TTC</strong>: <span id="totalTTC">'+ totalTTC.toFixed(2) +'</span></div>';
        html += '<a href="removeItem?id=all"><button>Empty your basket</button></a>';
        return html;
      }
  
  
      addItem( objx ){ this.items.push(objx) ; }
  
      removeItem( id ){ 
        for (let i in this.items){
          if(id == this.items[i].id){
            this.items.splice(i, 1);
            return false;
          }
        }
      }
      
      constructor() {
        this.items = new Array();
      } 
  
  }