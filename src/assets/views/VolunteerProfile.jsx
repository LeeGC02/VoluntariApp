import "./VolunteerProfile.css";
import HeaderWebApp from "../components/HeaderWebApp";
import OrganizationCard from "../components/OrganizationCard";
import ExperienceCard from "../components/ExperienceCard";
import ArchievementCard from "../components/ArchievementCard";
import ReviewCard from "../components/ReviewCard";
import VolunteerDataCard from "../components/VolunteerDataCard";
import SkillCard from "../components/SkillCard";

const VolunteerProfile = () => {
  const dataVol = [
    {
      nameVol: "Juan Perez",
      descVol: "Passionate Environmental Activist | Community Organizer",
      location: "Sausalito, California, United States",
      email: "juan.perez@gmail.com",
      age: 21,
      aboutVol:
        "Dedicated volunteer with 5+ years of experience in environmental conservation and community organizing. Committed to making a positive impact through grassroots initiatives and sustainable practices.",
      archievement:
        "Organized a city-wide recycling campaign that increased recycling rates by 30%",
      review:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium modi nostrum qui sed ab soluta recusandae sit esse dignissimos iure voluptatibus odio dolores, minima nobis consequatur temporibus laudantium corrupti ipsam!",
    },
  ];
  const dataOrg = [
    {
      nameOrg: "Lead Volunteer",
      descOrg: "Green Earth Initiative",
      startDate: "Jan 2020",
      endDate: "Present",
    },
    {
      nameOrg: "Co-Organizer",
      descOrg: "Beach Cleanup Campaign",
      startDate: "Mar 2018",
      endDate: "Dec 2019",
    },
    {
      nameOrg: "Coordinator",
      descOrg: "Tree Planting Drive",
      startDate: "Jun 2017",
      endDate: "Feb 2018",
    },
  ];
  const combinedData = dataOrg.map((org, index) => ({
    ...org,
    nameVol: dataVol[index]?.nameVol || "",
    review: dataVol[index]?.review || "",
    archievement: dataVol[index]?.archievement || "",
  }));

  return (
    <div className="">
      <HeaderWebApp />
      <div className="grid-container">
        <div className="uno">
          {dataVol.map((vol, index) => (
            <VolunteerDataCard
              key={index}
              nameVol={vol.nameVol}
              descVol={vol.descVol}
              location={vol.location}
              email={vol.email}
              age={vol.age}
              aboutVol={vol.aboutVol}
            />
          ))}
        </div>
        <div className="dos">
          <h4>Otras Organizaciones</h4>
          {dataOrg.map((org, index) => (
            <OrganizationCard
              key={index}
              nameOrg={org.nameOrg}
              descOrg={org.descOrg}
            />
          ))}
        </div>
        <div className="tres">
          <h4>Experiencia de Voluntariado</h4>
          <div className="tres-otro">
            {dataOrg.map((org, index) => (
              <ExperienceCard
                key={index}
                nameOrg={org.nameOrg}
                descOrg={org.descOrg}
                startDate={org.startDate}
                endDate={org.endDate}
              />
            ))}
            <button className="btn-add-experience">Añadir experiencia +</button>
          </div>
        </div>
        <div className="cuatro">
          <h4>Aptitudes</h4>
          <SkillCard/>
        </div>
        <div className="cinco">
          <h4>Logros de Voluntariado</h4>
          <div className="cinco-otro">
            {dataVol.map((vol, index) => (
              <ArchievementCard key={index} archievement={vol.archievement} />
            ))}
            <button className="btn-add-experience">Añadir Logro +</button>
          </div>
        </div>
        <div className="seis">
          <div className="seis-otro">
            <h4>Comentarios de Voluntariado</h4>
            <button className="btn-add-experience">Añadir Comentario +</button>
          </div>
          <div className="seis-otro-dos">
            {combinedData.map((items, index) => {
              return items.review ? (
                <ReviewCard
                  key={index}
                  nameOrg={items.nameOrg}
                  descOrg={items.descOrg}
                  nameVol={items.nameVol}
                  review={items.review}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile;
