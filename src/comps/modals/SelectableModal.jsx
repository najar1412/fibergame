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

      {props.subModal}
    </div>
  );
};

export default SelectableModal;
