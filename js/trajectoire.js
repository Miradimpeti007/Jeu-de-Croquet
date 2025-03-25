function getTrajectoir(n){
  const courbes = [];
  const courbe1 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(7, 1, 0.2),
      new THREE.Vector3(5, 1.5, 0.2),
      new THREE.Vector3(3, 1, 0.2)
  );
  courbes.push(courbe1);
  
  const courbe2 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(3, 1, 0.2),
      new THREE.Vector3(3.5, 1.3, 0.2),
      new THREE.Vector3(2.5, 1, 0.2),
      new THREE.Vector3(0.5, -0.2, 0.2)
  );
  courbes.push(courbe2);
  
  const courbe3Points = [
      new THREE.Vector3(0.5, -0.2, 0.2),
      new THREE.Vector3(1, 0.3, 0.2),
      new THREE.Vector3(0.5, 0.7, 0.2),
      new THREE.Vector3(-1, 0.7, 0.2),
      new THREE.Vector3(-1.5, 0.7, 0.2)
  ];

  const courbe3 = new THREE.Curve();
  courbe3.getPoint = function (t) {
      const ba = (n, k) => {
          const coeff = (n, k) => {
              let res = 1;
              for (let i = 0; i < k; i++) res *= (n - i) / (i + 1);
              return res;
          };
          return coeff(4, k) * Math.pow(1 - t, 4 - k) * Math.pow(t, k);
      };
  
      const point = new THREE.Vector3(0, 0, 0);
      for (let i = 0; i < courbe3Points.length; i++) {
          const weight = ba(4, i);
          point.add(courbe3Points[i].clone().multiplyScalar(weight));
      }
      return point;
  };
  courbes.push(courbe3);
  
  const courbe4 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-1.5, 0.7, 0.2),
      new THREE.Vector3(-3, 1, 0.2),
      new THREE.Vector3(-5, 1.2, 0.2),
      new THREE.Vector3(-6.5, 1, 0.2)
  );
  courbes.push(courbe4);

  const courbesv2 = [];
  const courbe1a = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(7, 1, 0.2),
      new THREE.Vector3(5, 0.6, 0.2),
      new THREE.Vector3(3, 1.2, 0.2)
  );
  courbesv2.push(courbe1a);

  const courbe2a = new THREE.CubicBezierCurve3(
      new THREE.Vector3(3, 1, 0.2),
      new THREE.Vector3(3.5, 1.3, 0.2),
      new THREE.Vector3(2.5, 1, 0.2),
      new THREE.Vector3(0.5, -0.2, 0.2)
  );
  courbesv2.push(courbe2a);

  const courbe3aPoints = [
      new THREE.Vector3(0.5, -0.2, 0.2),
      new THREE.Vector3(1, 0.3, 0.2),
      new THREE.Vector3(0.5, 0.7, 0.2),
      new THREE.Vector3(-1, 0.7, 0.2),
      new THREE.Vector3(-1.5, 0.7, 0.2)
  ];

  const courbe3a = new THREE.Curve();
  courbe3a.getPoint = function (t) {
      const ba = (n, k) => {
          const coeff = (n, k) => {
              let res = 1;
              for (let i = 0; i < k; i++) res *= (n - i) / (i + 1);
              return res;
          };
          return coeff(4, k) * Math.pow(1 - t, 4 - k) * Math.pow(t, k);
      };

      const point = new THREE.Vector3(0, 0, 0);
      for (let i = 0; i < courbe3aPoints.length; i++) {
          const weight = ba(4, i);
          point.add(courbe3aPoints[i].clone().multiplyScalar(weight));
      }
      return point;
  };
  courbesv2.push(courbe3a);

  const courbe4a = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-1.5, 0.7, 0.2),
      new THREE.Vector3(-3, 1, 0.2),
      new THREE.Vector3(-5, 1.2, 0.2),
      new THREE.Vector3(-6.8, 1.3, 0.2)
  );
  courbesv2.push(courbe4a);

  const courbesap = [];
  const courbe1c = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(7, 1, 0.2),
      new THREE.Vector3(5, 0.3, 0.2),
      new THREE.Vector3(3, 1, 0.2)
  );
  courbesap.push(courbe1c);

  const courbe2c = new THREE.CubicBezierCurve3(
      new THREE.Vector3(3, 1, 0.2),
      new THREE.Vector3(3.3, 0.8, 0.2),
      new THREE.Vector3(2, 0.8, 0.2),
      new THREE.Vector3(2.5, -3, 0.2)
  );
  courbesap.push(courbe2c);

  const courbespp = [];
  const courbe1d = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(7, 1, 0.2),
      new THREE.Vector3(5, 0.3, 0.2),
      new THREE.Vector3(3, 1, 0.2)
  );
  courbespp.push(courbe1d);

  const courbe2d = new THREE.CubicBezierCurve3(
      new THREE.Vector3(3, 1, 0.2),
      new THREE.Vector3(3.3, 0.8, 0.2),
      new THREE.Vector3(2, 0.8, 0.2),
      new THREE.Vector3(1, 1, 0.2)
  );
  courbespp.push(courbe2d);

  const courbespc = [];
  const courbe1e = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(7, 1, 0.2),
      new THREE.Vector3(5, 0.6, 0.2),
      new THREE.Vector3(3, 1.2, 0.2)
  );
  courbespc.push(courbe1e);

  const courbe2e = new THREE.CubicBezierCurve3(
      new THREE.Vector3(3, 1, 0.2),
      new THREE.Vector3(3.5, 1.3, 0.2),
      new THREE.Vector3(2.5, 1, 0.2),
      new THREE.Vector3(0.5, -0.2, 0.2)
  );
  courbespc.push(courbe2e);

  const courbe3ePoints = [
      new THREE.Vector3(0.5, -0.2, 0.2),
      new THREE.Vector3(0.5, 0.3, 0.2),
      new THREE.Vector3(-0.5, 0.7, 0.2),
      new THREE.Vector3(-1.2, 0.8, 0.2),
      new THREE.Vector3(-1.5, 0.7, 0.2)
  ];

  const courbe3e = new THREE.Curve();
  courbe3e.getPoint = function (t) {
      const ba = (n, k) => {
          const coeff = (n, k) => {
              let res = 1;
              for (let i = 0; i < k; i++) res *= (n - i) / (i + 1);
              return res;
          };
          return coeff(4, k) * Math.pow(1 - t, 4 - k) * Math.pow(t, k);
      };

      const point = new THREE.Vector3(0, 0, 0);
      for (let i = 0; i < courbe3ePoints.length; i++) {
          const weight = ba(4, i);
          point.add(courbe3ePoints[i].clone().multiplyScalar(weight));
      }
      return point;
  };
  courbespc.push(courbe3e);

  const courbe4e = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-1.5, 0.7, 0.2),
      new THREE.Vector3(-2.5, 1.2, 0.2),
      new THREE.Vector3(-5, 0.5, 0.2),
      new THREE.Vector3(-6.8, 1.1, 0.2)
  );
  courbespc.push(courbe4e);
  
  let res;
  if(n == "e"){
            
    r=Math.floor(Math.random() * 2);
     
    if(r==0){
                
      res= courbes;
                
    }
    else{
                
      res= courbesv2;
                
    }
  }
  else{
            
    let r = Math.random();
     
    if (r <= 0.05) {
            
      res= courbes;
    } 
    else {
            
      if(r<=0.1 && r>0.05){  
        res= courbespc;
      }
      else if (r<=0.5 && r>0.1){
        res= courbesap;
      }
      else{
        res= courbespp;
      }
    }
  }
  return res; 
}

