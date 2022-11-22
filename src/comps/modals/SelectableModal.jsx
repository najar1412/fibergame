const SelectableModal = (props) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl capitalize">
        {props.selectedMesh.selectableData.name}
      </h1>
      <p className="uppercase mb-8">{props.selectedMesh.selectableData.type}</p>
      <div className="mb-8">
        <p>{props.selectedMesh.selectableData.description}</p>
      </div>

      <p className="capitalize font-bold">fuel</p>
      <div className="flex items-center mb-8">
        <div className="w-[150px] max-w-[200px] w-full">wood</div>
        <div className="flex items-center">
          <div className="mr-4">
            <p className="flex items-center">0 </p>
          </div>
          <div>
            <p className="flex items-center">
              <span className="text-2xl font-bold mr-4 opacity-50">🠃</span>{" "}
              <span className="text-2xl font-bold">🠁</span>{" "}
            </p>
          </div>
        </div>
      </div>

      <p className="capitalize font-bold">contents</p>
      <div className="flex items-center">
        <div className="w-[150px] max-w-[200px] w-full">berries</div>
        <div className="flex items-center">
          <div className="mr-4">
            <p className="flex items-center">0 </p>
          </div>
          <div>
            <p className="flex items-center">
              <span className="text-2xl font-bold mr-4 opacity-50">🠃</span>{" "}
              <span className="text-2xl font-bold">🠁</span>{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-[150px] max-w-[200px] w-full">empty</div>
        <div className="flex items-center">
          <div className="mr-4">
            <p className="flex items-center">0 </p>
          </div>
          <div>
            <p className="flex items-center">
              <span className="text-2xl font-bold mr-4 opacity-50">🠃</span>{" "}
              <span className="text-2xl font-bold">🠁</span>{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-[150px] max-w-[200px] w-full">empty</div>
        <div className="flex items-center">
          <div className="mr-4">
            <p className="flex items-center">0 </p>
          </div>
          <div>
            <p className="flex items-center">
              <span className="text-2xl font-bold mr-4 opacity-50">🠃</span>{" "}
              <span className="text-2xl font-bold">🠁</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectableModal;
