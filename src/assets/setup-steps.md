Dear User, please follow these steps to get ready to use Harrier:

**Confirm AWS Account ID**, with role for Harrier setup

1. Create an AWS Account if needed  
2. Copy your AWS Account ID 12-digit number (visible in top-right corner drop down menu) and ***keep a note of it for later***.

**On AWS, Create an IAM Identity Provider**

1. Go to [Identity and Access Management (IAM)](https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/home) in your AWS Console  
2. Select [Identity Providers](https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/identity_providers/create) from the left-hand menu  
3. Press the “Add provider” button  
4. Choose “OpenID Connect” provider type  
5. For Provider URL, input: **https://token.actions.githubusercontent.com**  
6. For Audience, input: **sts.amazonaws.com** (if you are in the USA)  
7. Press the “Add provider” button

8. Click into the new provider called token.actions.githubusercontent.com  
9. Press the “Assign role” button, on the top-right  
10. “Create a new role”, and push the “Next” button  
11. Select the “Web identity” Trusted entity type  
12. Select the “token.actions.githubusercontent.com” Identity provider from the drop down  
13. Select the “sts.amazonaws.com” Audience from the drop down  
14. Enter your GitHub organization (or owner) name (e.g. 2408-capstone-team5)  
15. Optionally, restrict further to GitHub repository and branch, if desired  
16. Push the “Next” button  
17. Add these permissions:  
    * AmazonVPCFullAccess  
    * AmazonEC2FullAccess  
    * AmazonS3FullAccess  
    * AWSLambda\_FullAccess  
    * IAMFullAccess  
    * AmazonAPIGatewayAdministrator  
    * AmazonEventBridgeFullAccess  
    * AWSWAFConsoleFullAccess  
    * SecretsManagerReadWrite  
18. Name the role **setup-harrier**  
19. Add a suitable description for your role (optional)  
20. Select the newly created “harrier-setup-role”  
21. Push the “Create role” orange button  
22. Copy the ARN and ***keep a note of it for later***.

**On GitHub.com, Create a New Personal Access Token**  
Follow the steps on docs.github.com [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)  
Or follow these steps:

1. In the upper-right corner of any page on GitHub, click your profile photo, then click  “Settings”.  
2. In the left sidebar, click Developer settings (at the bottom).  
3. In the left sidebar, under Personal access tokens, click Tokens (classic).  
4. Select Generate new token, then click Generate new token (classic).  
5. In the "Note" field, give your token a descriptive name.  
6. To give your token an expiration, select Expiration, then choose a default option or click Custom to enter a date.  
7. Select the 4 following scopes to grant this token:  
   1. repo  
   2. workflow  
   3. admin:org  
   4. admin:org\_hook  
      ![][image1]  
8. Click Generate token.  
9. Copy your new token and ***keep a note of it for later***.

![][image2]

***Optional if you plan to use Docker Build and Push:***  
Create GitHub secrets to keep Docker Hub Username and Token  
Follow the steps on docs.github.com [here](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository)  
Or follow these steps:

1. On GitHub, navigate to the main page of the repository you want to use Harrier in.  
2. Under your repository name, click the Settings cog  
   ![][image3]  
3. In the "Security" section of the sidebar, select  Secrets and variables, then click Actions.  
4. Click the Secrets tab  
   ![][image4]  
5. Click New repository secret.  
6. In the Name field, type a name for your secret: (see below)  
7. In the Secret field, enter the value for your secret (see below)  
8. Click Add secret.

Optionally, if you wish to use Docker Build, add 2 more secrets:

1. DOCKERHUB\_USERNAME  
2. DOCKERHUB\_TOKEN

**On AWS, Create a new AWS Secret**

1. Go to AWS Secrets Manager in your AWS Console  
2. Press the “Store a new secret” button, on the top-right  
3. Select “Other type of secret” secret type  
4. Select “Plaintext” Key/value pairs  
5. Overwrite the {“”:””} with the GitHub Personal Access Token you copied earlier  
6. Push the “Next” button  
7. Enter **github/pat/harrier** as the Secret name  
8. Give your secret an apt description  
9. Push the “Next” button  
10. Leave the Automatic rotation option off by default  
11. Push the “Next” button  
12. Review details and push the “Store” button at the bottom of the page

On AWS Secrets Manager, create a new secret  
Enter the **GitHub PAT with name “github/pat/harrier”**

**Readme instructions:**

1. Use our setup.yml template  
2. Fill in your ec2 preference, Region, Account ID, and RoleArn 

**OR**

1. Use the Google Form to input your preferences   
2. Google (Harrier) will email you a setup.yml code/text for you to use

Your setup.yml file will use the public marketplace harrier setup action (harrier’s action.yml)

Chad, your setup.yml file should look like this:

name: Setup Harrier to run on AWS and GitHub  
on:  
  workflow\_dispatch

jobs:  
  push\_to\_registry:  
    name: Harrier Setup  
    runs-on: ubuntu-latest  
    steps:  
      \- name: Run Harrier Setup Action  
        uses: 2408-capstone-team5/fake-setup-harrier-action@v4.6  
        with:  
          org: ${{ github.repository\_owner }}  
          repo: ${{ env.REPO\_NAME }}  
          personal-access-token: ${{ secrets.personal\_access\_token }}

**Aws-credential action needs:**  
audience: \<YOUR\_AWS\_AUDIENCE\> \# sts.amazonaws.com  
aws-region: \<YOUR\_AWS\_REGION\> \# eg us-east-1  
role-to-assume: \<NEW\_ROLE\_ARN\> \# arn:aws:iam::222233334444:role/harrier-setup-role

**Harrier-setup action needs:** 

**Harrier-cache action needs:**

**ADDITIONAL:**  
ec2-runner: \# “t2.micro”  
Cache policy (time to live)
