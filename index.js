    var age = document.querySelector('[name="age"]'),
        relationship = document.querySelector('[name="rel"]'), 
        smoker = document.querySelector('[name="smoker"]'),
        formElement = document.querySelector('form'),
        addButton = document.querySelector('.add'),  
        submitButton = document.querySelector('button[type]'),
        parentDivAddButton,
        householdList = [];
    
    var removeButtonDiv = document.createElement('div');
        removeButtonDiv.innerHTML = "<button class='remove'>remove</button>";
        parentDivAddButton = document.querySelector('form div:nth-of-type(4)');
        insertAfter(removeButtonDiv,parentDivAddButton);

    var householdDataDisplay = document.querySelector('.debug'),
        householdDataH2Display = document.createElement('h2');
        householdDataH2Display.textContent = "Below is user dynamic household list:";
        insertAfter(householdDataH2Display,householdDataDisplay);

    var householdDataPDisplay = document.createElement('p');
        insertAfter(householdDataPDisplay,householdDataH2Display);
    
    
    var removeButton = document.querySelector('.remove');
        removeButton.disabled = true;


    /*  Enable 'required' attribute for the form input and select element make sure user provides age and relationship data */
        age.required = true;
        relationship.required = true; 
        sessionStorage.clear();
    
     
        addButton.addEventListener('click',function(event){        

           /* Validate age is a number and to be greater than 0 as well as relationship not being empty */
            if (isNaN(age.value) || (age.value < 1) || (relationship.value == '')) {
                     //alert('Invalid input');
            } 
            else {
                
                   event.preventDefault();
                
                   /* Add ppl to a growing household list */
                   addHouseholdData(age.value,relationship.value,smoker.checked);
                   removeButton.disabled = false;
    
                   //Reset the form fields after user click add button
                   formElement.reset();
            }  

        }); // end of addButton EventListener



        removeButton.addEventListener('click',function(){
            
            removeHouseholdData();           

            //Reset the form fields after user click add button
            formElement.reset();

        }); // end of SubmitButton EventListener



        /* Serialize the household as JSON upon form submission as a fake trip to the server */
        submitButton.addEventListener('click',function(){
            
            if (householdList.length == 0) {
                alert ('No information is provided.  Please use the add button to provide your Household information before submitting.');
            } else {
                
                alert('Thank you for your submission.');

                // Fake submission of the form instead will console log the serialize list.
                // Serialized JSON in the provided "debug" DOM element and display that element
                householdDataDisplay.textContent =  JSON.stringify(householdList);  
                
                sessionStorage.setItem('householdData',JSON.stringify(householdList));
                console.log('Thank you for your submission is shown as ',JSON.stringify(householdList));

                // Reset the form fields after user click add button
                formElement.reset();
        
            } //end of else
        }); // end of SubmitButton EventListener

    
            
        function addHouseholdData(age, relationship, smoker){
            var householdData = new ConstructHousehold(age, relationship, smoker);
                
                householdList.push(householdData);
                updateDisplay(householdList);
        }
        

        /* Display the household list in the HTML as it is modified */
        function updateDisplay(hhL) {
            var pElement, 
                displayList='';
        
            for (var i=0; i < hhL.length; i++){
                displayList += "Age is " + hhL[i].age + ".  Relationship is " + hhL[i].relationship+ ".  Smoker is "+ hhL[i].smoker + "."+ "<br>";  
            }
            
            householdDataPDisplay.innerHTML = "<p>" + displayList + "</p>";
        }


        /* Remove a previously added person from the list */
        function removeHouseholdData(){
            
             householdList.pop();
             updateDisplay(householdList);
               
             removeButton.disabled = true;
        }


        function insertAfter(el, referenceNode){
             referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }
        
 
        function ConstructHousehold(age, relationship, smoker){
             this.age = age;
             this.relationship = relationship;
             this.smoker = smoker;            
        }
