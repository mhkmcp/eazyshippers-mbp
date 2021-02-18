<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Warehouse;

class WarehouseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $Warehouses = Warehouse::all();
        return response()->json($Warehouses);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $data = $request->all();
        $validator = \Validator::make($data, [
            'locationAddCountry' => ['required', 'string'],
            'locationAddCity' => ['required', 'string'],
            'locationAddAddressLine1' => ['required', 'string'],
            'locationAddAddressLine2' => ['required', 'string'],
            'locationAddAddressLine3' => ['required', 'string'],
            'locationAddTypeLocation' => ['required', 'string'],
            'locationAddSetDeafult' => ['required']
        ], [
            'locationAddCountry.required' => 'Please give your warehouse country.',
            'locationAddCity.required' => 'Please give your warehouse city',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->getMessageBag(),
            ], 404);
        }

        $Warehouse = new Warehouse();
        //$Warehouse->warehouseId = $request->warehouseId;
        $Warehouse->country = $request->locationAddCountry;
        $Warehouse->city = $request->locationAddCity;
        $Warehouse->addressLine1 = $request->locationAddAddressLine1;
        $Warehouse->addressLine2 = $request->locationAddAddressLine2;
        $Warehouse->addressLine3 = $request->locationAddAddressLine3;
        $Warehouse->typeLocation= $request->locationAddTypeLocation;
        $Warehouse->setDeafult=$request->locationAddSetDeafult;
        //$Warehouse->warehouseStatus =$request->warehouseStatus;
    
        $Warehouse->save();

        $Warehouse = Warehouse::find($Warehouse->id);

        return response()->json([
            'success' => true,
            'message' => 'Warehouse created Successfully!',
            'data' => $Warehouse ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $editData = Warehouse::find($id);
        return response()->json($editData);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $data = $request->all();
        $validator = \Validator::make($data, [
            'locationAddCountry' => ['required', 'string'],
            'locationAddCity' => ['required', 'string'],
            'locationAddAddressLine1' => ['required', 'string'],
            'locationAddAddressLine2' => ['required', 'string'],
            'locationAddAddressLine3' => ['required', 'string'],
            'locationAddTypeLocation' => ['required', 'string'],
            'locationAddSetDeafult' => ['required']
        ], [
            'locationAddCountry.required' => 'Please give your warehouse country.',
            'locationAddCity.required' => 'Please give your warehouse city',
        ]);


        $Warehouse = Warehouse::find($id);

        $Warehouse->country = $request->locationAddCountry;
        $Warehouse->city = $request->locationAddCity;
        $Warehouse->addressLine1 = $request->locationAddAddressLine1;
        $Warehouse->addressLine2 = $request->locationAddAddressLine2;
        $Warehouse->addressLine3 = $request->locationAddAddressLine3;
        $Warehouse->typeLocation= $request->locationAddTypeLocation;
        $Warehouse->setDeafult=$request->locationAddSetDeafult;
        //$Warehouse->warehouseStatus =$request->warehouseStatus;
    
        $Warehouse->save();

        return response()->json([
            'message' => 'Warehouse updated Successfully!',
            'data' => $Warehouse ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $warehouse = Warehouse::find($id);

        if(!is_null($warehouse)) {
            $delete_status  =   Warehouse::where("id", $id)->delete();

            if($delete_status == 1) {
                return response()->json(["success" => true, "message" => "Warehouse record deleted successfully."]);
            }
            else{
                return response()->json(["status" => "failed", "message" => "failed to delete, please try again"]);
            }
        }
        else {
            return response()->json(["status" => "failed", "message" => "Whoops! no Warehouse found with this id"]);
        }
    }
}
