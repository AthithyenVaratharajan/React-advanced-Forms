import { startTransition, useEffect, useState } from "react";

const Form = () => {
    const [name , setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneType, setPhoneType] = useState("");
    const [staff, setStaff] = useState("");
    const [bio, setBio] = useState("");
    const [notifications, setNotifications] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);

    useEffect(() => {
        const errors = [];
        if (!name.length) errors.push("Please enter your Name");
        if (!email.includes("@"&& "." &&"com"&&"gmail")) errors.push("Please enter a valid Google Email");
        if (!phone.length || phone === /^[0-9\b]+$/) errors.push("Please enter a valid Phone Number");
        if (!staff.length) errors.push("Please select a staff");
        if (phone.length && !phoneType) errors.push("Please select a Phone Type");
        if (bio.length > 280) errors.push("Please bio length under 280 characters");
        setValidationErrors(errors);
    }, [name, email, phone, phoneType, bio, staff]);

    const characterLength = (e) => {
        setBio(e.target.value);
        setCharacterCount(e.target.value.length);

    };

    const handleOnChange = () =>{
        setNotifications(!notifications);
    };

    const onChange =(e) =>{
        const re= /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setPhone(e.target.value)
        }
    }

    const onSubmit=(e) =>{
        e.preventDefault();

        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Cannot Submit.`);

        const registrationForm = {
            name,
            email,
            phone,
            phoneType,
            staff,
            bio,
            notifications,
            characterCount,
            submittedOn: new Date()
        };

        console.log(registrationForm);
        setName("");
        setEmail("");
        setPhone("");
        setPhoneType("");
        setStaff("");
        setBio("");
        setNotifications(false);
        setValidationErrors([]);
        setHasSubmitted(false);
        setCharacterCount(0);
    };

    return(
        <div>
            <h1>Registration Form</h1>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>The following errors were found:
                <ul>
                    {validationErrors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                </div>
            )}
            <form onSubmit={onSubmit}>
               <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="text"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        id="phone"
                        type="text"
                        onChange={onChange}
                        value={phone}
                    />
                    <select
                        id="phoneType"
                        value={phoneType}
                        onChange={e => setPhoneType(e.target.value)}
                    >
                        <option value={""} disabled>
                            Select a phone Type ...
                        </option>
                        <option>Home</option>
                        <option>Work</option>
                        <option>Mobile</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="staff">Staff:</label>
                    <input
                        checked={staff==="Instructor"}
                        id="staff"
                        type="radio"
                        onChange={e => setStaff("Instructor")}
                        value={staff}
                    /> Instructor
                    <input
                        checked={staff==="Student"}
                        id="staff"
                        type="radio"
                        onChange={e => setStaff("Student")}
                        value={staff}
                    /> Student
                </div>
                <div>
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        maxLength={280}
                        rows={5}
                        placeholder="Tell us about yourself ..."
                        id="bio"
                        name="bio"
                        onChange={characterLength}
                        value={bio}
                    />
                    <p>CharacterCount: {characterCount}/280</p>
                </div>
                <div>
                    <label htmlFor="notifications">Want to receive Email notifications?:</label>
                    <input
                        type="checkbox"
                        id="bio"
                        name="bio"
                        onChange={handleOnChange}
                        checked={notifications}
                        inputProps={{ 'aria-label': 'controlled' }}
                        value={notifications}
                    />
                </div>
                <button>Submit!</button>
            </form>

        </div>
    )
};



export default Form;
