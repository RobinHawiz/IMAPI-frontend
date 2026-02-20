import logo from "@images/logo.svg";

function Footer() {
  return (
    <footer className="border-subtle/20 bg-footer flex flex-col items-center justify-center gap-4 border-t border-solid px-8 py-6 sm:flex-row sm:justify-between">
      <div className="sm:w-full sm:max-w-32">
        <img src={logo} aria-disabled="true" />
      </div>
      <p className="text-muted order-3 text-center text-xs sm:order-2 sm:min-w-84">
        © 2026 IMAPI. All rights reserved. Data provided by TMDb.
      </p>
      <ul className="flex gap-4 sm:order-3">
        <li>
          <a
            className="flex-center focus-visible:[&>svg]:fill-accent focus-visible:border-accent/30 focus-visible:bg-accent/5 hover:border-accent/30 hover:bg-accent/5 hover:[&>svg]:fill-accent h-8 w-8 rounded-full border border-solid border-transparent bg-white/5 transition-colors duration-200 focus-visible:outline-none"
            href="#"
          >
            <svg
              className="fill-muted transition-colors duration-200"
              width="14"
              height="13"
              viewBox="0 0 14 13"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="text-current"
                d="M11.0248 0H13.1725L8.48153 5.50625L14 13H9.68014L6.29422 8.45625L2.4246 13H0.273794L5.29031 7.10938L0 0H4.42938L7.48674 4.15312L11.0248 0ZM10.2703 11.6812H11.4598L3.7814 1.25H2.50369L10.2703 11.6812Z"
              />
            </svg>
          </a>
        </li>
        <li>
          <a
            className="flex-center focus-visible:[&>svg]:fill-accent focus-visible:border-accent/30 focus-visible:bg-accent/5 hover:border-accent/30 hover:bg-accent/5 hover:[&>svg]:fill-accent h-8 w-8 rounded-full border border-solid border-transparent bg-white/5 transition-colors duration-200 focus-visible:outline-none"
            href="#"
          >
            <svg
              className="fill-muted transition-colors duration-200"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="text-current"
                d="M7.00156 3.41058C5.01829 3.40433 3.40669 5.01004 3.40045 6.99375C3.3942 8.97746 4.99955 10.5894 6.98282 10.5957C8.96609 10.6019 10.5777 8.99621 10.5839 7.0125C10.5902 5.02878 8.98483 3.41682 7.00156 3.41058ZM6.98282 4.67265C8.2696 4.66641 9.3159 5.70668 9.32214 6.99375C9.32839 8.28082 8.28834 9.32735 7.00156 9.33359C5.71478 9.33984 4.66849 8.29956 4.66224 7.0125C4.656 5.72543 5.69604 4.6789 6.98282 4.67265ZM9.89994 3.26375C9.89994 2.80141 10.2747 2.42653 10.737 2.42653C11.1992 2.42653 11.574 2.80141 11.574 3.26375C11.574 3.7261 11.1992 4.10097 10.737 4.10097C10.2747 4.10097 9.89994 3.7261 9.89994 3.26375ZM13.9508 4.11347C13.8977 2.99197 13.6416 1.99855 12.8202 1.18007C12.0019 0.361598 11.0087 0.105433 9.88745 0.0492023C8.73185 -0.0164008 5.26815 -0.0164008 4.11255 0.0492023C2.99442 0.102309 2.00123 0.358474 1.17981 1.17695C0.358394 1.99543 0.10541 2.98884 0.0491913 4.11034C-0.0163971 5.26621 -0.0163971 8.73067 0.0491913 9.88653C0.102287 11.008 0.358394 12.0015 1.17981 12.8199C2.00123 13.6384 2.9913 13.8946 4.11255 13.9508C5.26815 14.0164 8.73185 14.0164 9.88745 13.9508C11.0087 13.8977 12.0019 13.6415 12.8202 12.8199C13.6385 12.0015 13.8946 11.008 13.9508 9.88653C14.0164 8.73067 14.0164 5.26933 13.9508 4.11347ZM12.4579 11.1267C12.2143 11.739 11.7427 12.2108 11.1274 12.4575C10.206 12.823 8.01974 12.7387 7.00156 12.7387C5.98338 12.7387 3.79398 12.8199 2.87574 12.4575C2.26358 12.2139 1.79197 11.7422 1.54523 11.1267C1.17981 10.2052 1.26414 8.01841 1.26414 7C1.26414 5.98159 1.18293 3.7917 1.54523 2.87326C1.78885 2.26096 2.26046 1.78924 2.87574 1.54245C3.7971 1.17695 5.98338 1.2613 7.00156 1.2613C8.01974 1.2613 10.2091 1.18007 11.1274 1.54245C11.7395 1.78612 12.2112 2.25784 12.4579 2.87326C12.8233 3.79482 12.739 5.98159 12.739 7C12.739 8.01841 12.8233 10.2083 12.4579 11.1267Z"
              />
            </svg>
          </a>
        </li>
        <li>
          <a
            className="flex-center focus-visible:[&>svg]:fill-accent focus-visible:border-accent/30 focus-visible:bg-accent/5 hover:border-accent/30 hover:bg-accent/5 hover:[&>svg]:fill-accent h-8 w-8 rounded-full border border-solid border-transparent bg-white/5 transition-colors duration-200 focus-visible:outline-none"
            href="#"
          >
            <svg
              className="fill-muted transition-colors duration-200"
              width="14"
              height="10"
              viewBox="0 0 14 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="text-current"
                d="M13.7052 1.5651C13.5463 0.947917 13.0696 0.463542 12.4672 0.299479C11.3779 0 7 0 7 0C7 0 2.62212 0 1.53021 0.299479C0.927865 0.463542 0.45368 0.947917 0.292201 1.5651C4.88885e-08 2.68229 0 5.01042 0 5.01042C0 5.01042 4.88885e-08 7.33854 0.292201 8.45573C0.45368 9.07031 0.927865 9.53646 1.53021 9.70052C2.62212 10 7 10 7 10C7 10 11.3779 10 12.4698 9.70052C13.0721 9.53646 13.5463 9.07031 13.7078 8.45573C14 7.33854 14 5.01042 14 5.01042C14 5.01042 14 2.68229 13.7078 1.5651H13.7052ZM5.56719 7.125V2.89583L9.22483 5.01042L5.56719 7.125Z"
              />
            </svg>
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
