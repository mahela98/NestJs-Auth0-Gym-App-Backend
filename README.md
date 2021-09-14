# Backend for a Gym application using NestJs, Auth0 and MongoDb

### To start
  - start mongodb
  - npm run start:dev


  #### Important  
    - when updating an objectid in a document send [] to indicate empty
    - date format shouldbe "date": "2021-06-18T07:03:01.078Z"

## When Adding Data

### Membership Type
    {"type": "Type 01",
    "description":"small description",
    "body":"description", 
    "price":"5000"}
    
 ### Member 
     {
        "first_name": "name 1",
        "middle_name": "middle",
        "last_name": "name 2",
        "email": "email@kemail.com",
        "mobile": "1111111111",
        "occupation": "Manager",
        "birthday": "2012-02-21",
        "membershiptype": "Should give a membership type ID",
        "address": {
            "line1": "sdf",
            "line2": "sdf",
            "city": "sdf"
        },
        "nationality": {
            "passport_number": "35rdfdfsdf",
            "nic_number": "35rdfdfsdf"
        }
    }

### API endpoints
<table><tr><td> 

#### Member
      /member/create, POST
      /member/edit/:memberID, PUT
      /member/delete/:memberID, DELETE
      /member/:memberID, GET
      /member, GET
##### Member GET Query Params
        page
        limit
        namesearch - search members using name
        nationalitySearch - search members using NIC or Passport
 
 </td>   

<td>

#### Membership Type
       /membershiptype/create, POST
       /membershiptype/edit/:MambershipTypeID, PUT
       /membershiptype/delete/:MambershipTypeID, DELETE
       /membershiptype/:MambershipTypeID, GET
       /membershiptypes, GET

  </td>
  </tr> 
</table>

   ### Used URL's 
  Developing a Secure API with NestJS: Managing Identity
      - https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-authorization/#Enable-CORS-in-NestJS
  Developing a Secure API with NestJS: Managing Roles
    - https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-role-based-access-control/