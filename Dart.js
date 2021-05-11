class Dart{
    constructor(x,y,width,height,angle){
        var options={
			friction :1,
			density :0.5
			}
        this.body = Bodies.rectangle(x,y,width,height,angle,options);
        this.image=loadImage("dart.png");
        Matter.Body.setAngle(this.body,angle);
        World.add(world,this.body);
    }
    display(){
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0,130,90);
        pop();
    }
}