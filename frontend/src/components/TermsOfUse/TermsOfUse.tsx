import { useNavigate } from "react-router-dom";

export const TermsOfUse = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="terms-of-use">
        <div className="container">
          <div className="terms-of-use__inner">
            <h1 className="privacy-policy__title">
              Terms of Use & Privacy Policy
            </h1>
            <div className="terms-of-use__text-container">
              <div className="privacy-policy__text-block">
                <p className="default-text">
                  By registering to use and access the FOM Online, Inc.
                  (“PhotoDrop”) websites located at photodrop.me and
                  frameology.com, the PhotoDrop photo matching service, and
                  texting bot (together, the “Service”), you are agreeing to be
                  bound by these Terms of Use (the “Terms”). The Terms and our
                  Privacy Policy (
                  <a
                    onClick={() => {
                      navigate("/privacy-policy");
                    }}
                  >
                    fullstack-photo-drop-users.vercel.app/privacy-policy
                  </a>
                  ) govern your use of our Service. By agreeing to these Terms,
                  you represent that you are not a resident of the state of
                  Illinois and will not upload photos to PhotoDrop taken in the
                  state of Illinois.
                  <span className="privacy-policy__bold-text">
                    Please read these Terms carefully. Unless you opt out of
                    arbitration in accordance with the instructions below within
                    30 days of first agreeing to these Terms, you are agreeing
                    that we will resolve certain disputes between us in binding
                    arbitration on an individual basis rather than in jury
                    trials or class actions.
                  </span>
                </p>
              </div>
              <div className="privacy-policy__text-block">
                <p className="default-text">
                  If you do not agree with any of these terms, you are
                  prohibited from using or accessing the Service. If you are
                  accessing and using the Service on behalf of a company (such
                  as your employer) or other legal entity, you represent and
                  warrant that you have the authority to bind that company or
                  other legal entity to these Terms. In that case, “you” and
                  “your” will refer to that company or other legal entity.
                </p>
              </div>
              <div className="privacy-policy__text-block">
                <p className="privacy-policy__bold-text">Privacy Policy</p>
                <p className="default-text">
                  Please refer to our Privacy Policy at{" "}
                  <span className="privacy-policy__bold-text">
                    <a
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      {" "}
                      https://fullstack-photo-drop-users.vercel.app
                    </a>{" "}
                  </span>
                  privacy for information on how we collect, use and disclose
                  information from our users. You acknowledge and agree that
                  your use of the Service is subject to our Privacy Policy.
                </p>
              </div>
              <div className="privacy-policy__text-block">
                <p className="privacy-policy__bold-text">
                  Facial Recognition Technology
                </p>
                <p className="default-text">
                  You agree that we may use facial recognition technology to
                  allow us to identify photos on the Service in which you appear
                  when you add a reference photo to the Service. For example,
                  our facial recognition technology will compare your reference
                  image with albums of photos to locate photos of you. In
                  addition, your responses to potential photo matches may
                  improve the accuracy of the facial recognition technology. By
                  using the Service and adding a reference image, you consent to
                  the use of facial recognition technology to identify photos on
                  the Service in which you appear. You represent that the
                  reference image photo added by you to the Service is you (or a
                  family member for whom you are the legal guardian or have
                  their consent) and that you are not impersonating or
                  misrepresenting yourself as any other person or entity. For
                  more information on our use of facial recognition technology,
                  please see our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
