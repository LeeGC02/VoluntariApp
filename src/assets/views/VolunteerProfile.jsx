import HeaderWebApp from "../components/HeaderWebApp";
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
    <div className="bg-gray-50">
      <HeaderWebApp />
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 gap-6 mt-20">
        {/* Título */}
        <h3 className="font-bold text-2xl text-orangePrincipal py-1 text-center md:col-span-6">
          Perfil del Usuario
        </h3>
  
        {/* Información del Voluntario */}
        <div className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-4 lg:col-span-6">
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
  
        <h3 className="font-bold text-xl text-orangePrincipal text-start md:col-span-6">
          Características del voluntario
        </h3>
        {/* Aptitudes */}
        <div className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-2 lg:col-span-3">
          <h4 className="text-xl font-semibold mb-4">Aptitudes</h4>
          <SkillCard />
        </div>
        {/* Logros */}
        <div className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-4 lg:col-span-3">
          <h4 className="text-xl font-semibold mb-4">Logros de Voluntariado</h4>
          <div className="space-y-4">
            {dataVol.map((vol, index) => (
              <ArchievementCard key={index} archievement={vol.archievement} />
            ))}
          </div>
        </div>
  
        {/* Comentarios */}
        <div className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-semibold">Comentarios de Voluntariado</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {combinedData.map((items, index) =>
              items.review ? (
                <ReviewCard
                  key={index}
                  nameOrg={items.nameOrg}
                  descOrg={items.descOrg}
                  nameVol={items.nameVol}
                  review={items.review}
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default VolunteerProfile;
