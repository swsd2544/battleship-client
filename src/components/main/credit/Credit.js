import classes from "./Credit.module.css";

const authorsData = [
  {
    href: "https://www.facebook.com/rangsiman.piyachanya",
    title: "Cos",
    studentId: "6238181721",
    name: "Rangsiman Piyachanya",
  },
  {
    href: "https://www.facebook.com/swsd2544",
    title: "Fame",
    studentId: "6235205121",
    name: "Siriwudhi Sawaidee",
  },
  {
    href: "https://www.facebook.com/droidakaken",
    title: "Ken",
    studentId: "6238209721",
    name: "Supakorn Suvichai",
  },
  {
    href: "https://www.facebook.com/supakrit.kuewsupakorn",
    title: "Four",
    studentId: "6238210221",
    name: "Supakit Kuewsupakorn",
  },
  {
    href: "https://www.facebook.com/anto.san.7127",
    title: "Ant",
    studentId: "6238245221",
    name: "Anthiwat Chaksangchaichot",
  },
];

const Credit = () => {
  return (
    <div className={classes.name_container}>
      {authorsData.map((item, index) => {
        return (
          <div>
            <a
              key={index}
              href={item.href}
              title={item.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.studentId} {item.name}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Credit;
