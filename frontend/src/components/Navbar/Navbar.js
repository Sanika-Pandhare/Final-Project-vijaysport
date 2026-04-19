


// import React from "react";
// import menuData from "./menuData";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="z-10" style={styles.wrapper}>
//       <div style={styles.navbar}>
//         {Object.keys(menuData).map((category) => (
//           <div
//             key={category}
//             style={styles.navItem}
//             onClick={() =>
//               navigate(`/category/${encodeURIComponent(category)}`)
//             }
//           >
//             {category}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   wrapper: {
//     position: "relative",
//     borderBottom: "1px solid #eee",
//     background: "#fff"
//   },
//   navbar: {
//     display: "flex",
//     gap: "30px",
//     padding: "15px 40px",
//     maxWidth: "1200px",
//     margin: "auto"
//   },
//   navItem: {
//     cursor: "pointer",
//     fontWeight: "500"
//   }
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import menuData from "./menuData";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Hide navbar on mobile screen
  if (isMobile) {
    return null;
  }

  return (
    <div className="z-10" style={styles.wrapper}>
      <div style={styles.navbar}>
        {Object.keys(menuData).map((category) => (
          <div
            key={category}
            style={styles.navItem}
            onClick={() =>
              navigate(`/category/${encodeURIComponent(category)}`)
            }
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "relative",
    borderBottom: "1px solid #eee",
    background: "#fff",
  },
  navbar: {
    display: "flex",
    gap: "30px",
    padding: "15px 40px",
    maxWidth: "1200px",
    margin: "auto",
    alignItems: "center",
  },
  navItem: {
    cursor: "pointer",
    fontWeight: "500",
    whiteSpace: "nowrap",
  },
};

export default Navbar;