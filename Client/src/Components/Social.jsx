/* eslint-disable react/prop-types */

import { AwesomeButton } from "react-awesome-button";
import { FaGithub, FaGoogle } from "react-icons/fa";

export function Social({
  handleGoogleLogIn,
  handleGithubLogIn
}) {
  return <div className="flex flex-col items-center justify-center">
        <div className="gap-[3vw] md:gap-[1vw] flex flex-col items-center justify-center" //lg:w-[15%] md:w-[25%] sm:w-[50%] w-[65%]
    >
          <div className="text-slate-700 my-3">
            ____________Or Log In with___________
          </div>
          <div onClick={handleGoogleLogIn}>
            <AwesomeButton type="danger">
              <p className="flex items-center gap-1">
                <span>
                  <FaGoogle />
                </span>{" "}
                <span>Log In with Google</span>
              </p>
            </AwesomeButton>
          </div>

          <div onClick={handleGithubLogIn}>
            <AwesomeButton type="github">
              <p className="flex items-center gap-1">
                <span>
                  <FaGithub />
                </span>{" "}
                <span>Log In with Github</span>
              </p>
            </AwesomeButton>
          </div>
        </div>
      </div>;
}
  