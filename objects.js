export class InactiveObject{
    construct (x, y, imageSrc, ctx){
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.image= new Image();
        this.image.src= imageSrc;
        this.image.onload = () => {
            this.draw(ctx);
          };
    }

    draw(){
        this.ctx.drawImage(this.image, this.x, this.y);
    }
}