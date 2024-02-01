const ApplicantForm = () => {
  return (
    <section className="application-form">
        <h2>Applicant Form</h2>
        <form>
            <label>
                Applicant Full Name:
            </label>
            <input>
            </input>
            <label>
                Experience:
                {/* yes/no drop-down connected to boolean */}
            </label>
            <input>
            </input>
            <label>
                E-mail:
            </label>
            <input>
            </input>
            <label>
                Comments:
            </label>
            <input>
            </input>
            <label>
                Terms and Conditions:
                {/* check box for if filled out agreement form and connected to boolean code */}
            </label>
            <input>
            </input>
            <button>Submit</button>
        </form>
    </section>
  )
}

export default ApplicantForm;

/*  
"applicant": "Alan R.",
"hasExperience": true,
"termsAgreement": true,
"email": "alanr123@gmail.com",
"comments": "Look forward to hearing from you."
*/