function HomeLogo({ className }: { className?: string }) {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        className={`w-[1.2em] h-[1.2em] inline-block ${className}`}
      >
        <g id="intellectual">
          <path 
            fill="currentColor" 
            fillRule="evenodd"
            d="M6 17.7V22h2v-5.2l-0.65 -0.6c-0.75 -0.7 -1.32917 -1.5 -1.7375 -2.4C5.20417 12.9 5 11.95 5 10.95c0 -1.93333 0.68333 -3.575 2.05 -4.925C8.41667 4.675 10.0667 4 12 4c1.6167 0 3.05 0.475 4.3 1.425 1.25 0.95 2.0667 2.18333 2.45 3.7L19.7 13H17v5h-4v4h2v-2h2c0.55 0 1.0208 -0.1958 1.4125 -0.5875C18.8042 19.0208 19 18.55 19 18v-3h2c0.3333 0 0.6 -0.1292 0.8 -0.3875 0.2 -0.2583 0.2583 -0.5458 0.175 -0.8625l-1.3 -5.125c-0.4833 -1.96667 -1.5292 -3.5625 -3.1375 -4.7875C15.9292 2.6125 14.0833 2 12 2c-2.5 0 -4.625 0.875 -6.375 2.625S3 8.5 3 11c0 1.2833 0.2625 2.5042 0.7875 3.6625C4.3125 15.8208 5.05 16.8333 6 17.7Zm1.78559 -4.0075c-1.23879 -1.935 -1.0125 -4.53666 0.67888 -6.22803 1.69133 -1.69138 4.29303 -1.91767 6.22803 -0.67888 0.5696 0.36467 0.76 1.08021 0.5214 1.71305C14.8661 9.42093 14.1941 10.8059 13 12c-1.1941 1.1941 -2.5791 1.8661 -3.50136 2.2139 -0.63284 0.2386 -1.34838 0.0482 -1.71305 -0.5214Z" 
            clipRule="evenodd"
            strokeWidth="1"
          />
        </g>
      </svg>
    );
  }
  
  export default HomeLogo;
  