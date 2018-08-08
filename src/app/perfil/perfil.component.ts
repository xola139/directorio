import { Component,ViewChild, OnInit,ElementRef } from '@angular/core';
import { MatSnackBar,MatDialog,MatTableDataSource,MatRadioChange,MatCheckboxChange } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from './perfil.service';
import { ModelService } from '../model/model.service';
import { Location} from '@angular/common';
import { ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder,FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { LoaderService } from '../loader.service';




@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit  {
  @ViewChild('closeButton') closeButton:ElementRef;


  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;
  hidebutton: any[] = [];


  emailFormControl = new FormControl('', [Validators.required,Validators.email,]);
  edadFormControl = new FormControl('', [Validators.required,Validators.email,]);

	perfil:any;
  resourcesLoaded: Boolean;
  viewAdmin: Boolean;
  noautorizado:Boolean;
		
  idiomas = [
    {value: 'espanol', viewValue: 'Español'},
    {value: 'ingles', viewValue: 'Ingles'}

	];
	
  

	horarios = [ ];

  cudades = [
    {value: 'Aguascalientes', viewValue: 'Aguascalientes'},
    {value: 'Baja California', viewValue: 'Baja California'},
    {value: 'Baja California Sur', viewValue: 'Baja California Sur'},
    {value: 'Campeche', viewValue: 'Campeche'},
    {value: 'Chiapas', viewValue: 'Chiapas'},
    {value: 'Chihuahua', viewValue: 'Chihuahua'},
    {value: 'Coahuila de Zaragoza', viewValue: 'Coahuila de Zaragoza'},
    {value: 'Colima', viewValue: 'Colima'},
    {value: 'Cuernavaca', viewValue: 'Cuernavaca'},
    {value: 'CDMX', viewValue: 'CDMX'},
    {value: 'Estado de Mexico', viewValue: 'Estado de México'},
    {value: 'Durango', viewValue: 'Durango'},
    {value: 'Guanajuato', viewValue: 'Guanajuato'},
    {value: 'Guerrero', viewValue: 'Guerrero'},
    {value: 'Guadalajara', viewValue: 'Guadalajara'},
    {value: 'León', viewValue: 'León'},
    {value: 'Michoacan de Ocampo', viewValue: 'Michoacán de Ocampo'},
    {value: 'Monterrey', viewValue: 'Monterrey'},
    {value: 'Morelos', viewValue: 'Morelos'},
    {value: 'Nayarit', viewValue: 'Nayarit'},
    {value: 'Oaxaca', viewValue: 'Oaxaca'},
    {value: 'Puebla', viewValue: 'Puebla'},
    {value: 'Playa del Carmen', viewValue: 'Playa del Carmen'},
    {value: 'Pachuca', viewValue: 'Pachuca'},
    {value: 'Poza Rica', viewValue: 'Poza Rica'},
    {value: 'Queretaro', viewValue: 'Querétaro'},
    {value: 'Quintana Roo', viewValue: 'Quintana Roo'},
    {value: 'San Luis Potosí', viewValue: 'San Luís Potosí'},
    {value: 'Sinaloa', viewValue: 'Sinaloa'},
    {value: 'Sonora', viewValue: 'Sonora'},
    {value: 'Tabasco', viewValue: 'Tabasco'},
    {value: 'Toluca', viewValue: 'Toluca'},
    {value: 'Tamaulipas', viewValue: 'Tamaulipas'},
    {value: 'Tlaxcala', viewValue: 'Tlaxcala'},
    {value: 'Xalapa', viewValue: 'Xalapa'},
    {value: 'Veracruz', viewValue: 'Veracruz'},
    {value: 'Yucatán', viewValue: 'Yucatán'},
    {value: 'Zacatecas', viewValue: 'Zacatecas'}

  ];

  form;
  constructor(private loaderService: LoaderService,
              private fb: FormBuilder,public dialog: MatDialog,
              private _location: Location,
              private route: ActivatedRoute, 
              private router: Router, 
              private perfilService: PerfilService,
              private modelService: ModelService,
              public snackBar: MatSnackBar) 
  { 
	     this.lottieConfig = {
            path: 'assets/loading_animation.json',
            autoplay: true,
            loop: true
        };

      let regexPatterns = {
           // this can be improved
           hours: "[0-2]?[0-9]?",
           minutes: "[0-5]?[0-9]?",
           age:"^(1[89]|[23][0-9]|50)$"
        };

    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required,Validators.pattern(regexPatterns.age)]],
      telefono:['',[]],
      accountbackup:['',[]],
      status:['',[]],
      llamadas:['',[]],
      whatsapp:['',[]],
      twitter:['',[]],
      ciudad:['',[]],
      description:['',[]],
      descripcionTwitter:['',[]],
      nacionalidad:['',[]],
      espanol:['',[]],
      ingles:['',[]],
      fulltime:['',[]],
      hfin:['',[]],
      hinicio:['',[]],
      
      lunes:['',[]],
      martes:['',[]],
      miercoles:['',[]],
      jueves:['',[]],
      viernes:['',[]],
      sabado:['',[]],
      domingo:['',[]],
      fulltimeSemana:['',[]],
      estatura:['',[]],
      tarjeta:['',[]],
      efectivo:['',[]],
      peso:['',[]],
      medidas:['',[]],
      edad:['', [Validators.required,Validators.pattern(regexPatterns.age)]],
      atiende:['',[]],
      autorizaImagen:['',[]],
    });
	}

  
  handleAnimation(anim: any) {
        this.anim = anim;
    }

    stop() {
        this.anim.stop();
    }

    play() {
        this.anim.play();
    }

    pause() {
        this.anim.pause();
    }

    setSpeed(speed: number) {
        this.animationSpeed = speed;
        this.anim.setSpeed(speed);
    }

  
  	ngOnInit() {
			this.perfil = {};
      this.perfil.idiomas = [{espanol:false,ingles:false}];
      this.perfil.opcionesTelefono = {whatsapp:false,llamadas:false,twitter:false};
      this.perfil.cuerpo = [{estatura:'',ojos:'',cabello:'',medidas:'',peso: ''}];
      this.perfil.horarioAtencion=[{hinicio:'',hfin:''}];
      this.perfil.diasAtencion={lunes:'',martes:'',miercoles:'',jueves:'',viernes:'',sabado:'',domingo:'',fulltime:''};
      this.perfil.pago = {tarjeta:false,efectivo:false};
			
      for (let i = 0; i < 24; i++) {
        this.horarios.push({value: i, viewValue: i +':00'});
      }	
  		
      this.getPerfil(this.route.snapshot.params['id']);

      
      if(this.route.snapshot.queryParams.aut)
        this.viewAdmin = true;
      else
        this.viewAdmin = false;


		  
       window.scrollTo(0, 0);
  	}

    borrarPostTwitter(x,p){
      console.log("Intentnando borrar twiester");

      this.hidebutton[x] = true;
      this.openSnackBar();
      
      this.modelService.deletePostTwitter(p.id).then((res) => {
        console.log(res);

        
      });

      
    }


  	getPerfil(id) {
		  this.perfilService.showPerfil(id).then((res) => {
        console.log(".....response...."+res);
        console.log(res);

        if(res == null)
          this.noautorizado = true;
        else{
          this.perfil = res;
          var auxImages =[];
          
          for(var xx=0;xx<this.perfil.images.length;xx++){
            if( this.perfil.images[xx].autorizaImagen == undefined)
                this.perfil.images[xx].autorizaImagen = false;
              if(this.perfil.images[xx].status != 'nada' )
                auxImages.push(this.perfil.images[xx]);
          }

          this.perfil.images = auxImages;
          this.perfil.images.sort;

          if(this.perfil.pago == undefined)
            this.perfil.pago = {tarjeta:false,efectivo:false};

          this.loaderService.display(false);

        }
      }, (err) => {

        console.log("por aca oiner el redirec");
      	console.log(err);
        window.location.href = "/login/";
    	});
  	}

    evaluando() {
      return true;
    }
  	updatePerfil(id) {
      this.resourcesLoaded = true;
      this.perfil.status = true;
      this.perfil.perfil ={descripcionTwitter:true} ;//TODO:quitar cuando se trare de elejir entre twiiter y mesninado
	    this.perfilService.updatePerfil(id, this.perfil).then((result) => {
      let id = result['_id'];
      this.resourcesLoaded = false;
    	}, (err) => {
      	console.log(err);
    });
  }

  radioChange(event: MatRadioChange,indice,urlCalendar) {
    if(event.value === 'calendario'){
      this.perfil.calendario =  urlCalendar;
    }
    
    this.perfil.images[indice].status =event.value;
  }


  autAdminChange(event:MatCheckboxChange,indice) {
     this.perfil.images[indice].autorizaImagen = event.checked;
  }
	

  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  closeModal() {
    this.closeButton.nativeElement.click();
  }

   openSnackBar() {
    this.snackBar.open("Mensaje borrado", "Acción", {
      duration: 2000,
    });
  }

  
}