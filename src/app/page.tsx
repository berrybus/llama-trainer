import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100 border-solid border-b-2 pb-0 mb-8 ">
        <div className="flex items-baseline prose w-full divide-x">
          <h1 className="text-xl px-2">LLama Trainer</h1>
          <p className="px-2">Historical LearnedLeague questions</p>
        </div>
      </div>

      <div className="flex flex-row items-start gap-4 flex-wrap md:flex-nowrap">
        <div className="card bg-base-100 shadow basis-full md:basis-2/3">
          <div className="card-body">
            <h3 className="card-title">LITERATURE - November 16, 2016</h3>
            <p>If a dog chews shoes whose shoes does he choose?</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow basis-full grow-0 md:basis-1/3">
          <div className="card-body">
            <table className="table table-zebra w-10">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>% correct</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>A</th>
                  <td>99</td>
                </tr>
                <tr>
                  <th>B</th>
                  <td>80</td>
                </tr>
                <tr>
                  <th>C</th>
                  <td>70</td>
                </tr>
                <tr>
                  <th>D</th>
                  <td>56</td>
                </tr>
                <tr>
                  <th>E</th>
                  <td>23</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
