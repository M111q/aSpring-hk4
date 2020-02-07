package com.github.m111q.homework4.api;

import com.github.m111q.homework4.model.Car;
import com.github.m111q.homework4.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/cars",
        produces = {
                MediaType.APPLICATION_JSON_VALUE,
                MediaType.APPLICATION_XML_VALUE})
public class CarApi {

    private CarService carService;

    public CarApi() {
    }

    @Autowired
    public CarApi(CarService carService) {
        this.carService = carService;
    }

    //do pobierania wszystkich pozycji
    @GetMapping
    public ResponseEntity<List<Car>> getCars() {
        List carList = carService.getAllCars();
        if (!carList.isEmpty()) {
            return new ResponseEntity<>(carList, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //do pobierania elementu po jego id
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCars(@PathVariable long id) {
        Optional<Car> car = carService.getCarById(id);
        if (car.isPresent()) {
            return new ResponseEntity<>(car.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //do pobierania elementów w określonym kolorze (query)
    @GetMapping
    @RequestMapping("/color")
    public ResponseEntity<List<Car>> getCarsByColor(@RequestParam String color) {
        List<Car> searchedCars = carService.getCarsByColor(color);
        if (!searchedCars.isEmpty()) {
            return new ResponseEntity<>(searchedCars, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //do dodawania pozycji
    @PostMapping
    public ResponseEntity addCar(@RequestBody Car car) {
        boolean result = carService.addCar(car);
        if (result) {
            return new ResponseEntity(HttpStatus.CREATED);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    //do modyfikowania pozycji
    @PutMapping
    public ResponseEntity modCar(@RequestBody Car car) {
        boolean result = carService.modCar(car);
        if (result) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_MODIFIED);
    }

    //do usuwania jeden pozycji
    @DeleteMapping("/{id}")
    public ResponseEntity removeCar(@PathVariable long id) {
        if (carService.removeCarFromList(id)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    //do modyfikowania jednego z pól pozycji
    @PatchMapping
    public ResponseEntity modCarByOneField(@RequestBody Car car) {
        boolean result = carService.updateCarByOneField(car);

        if (result) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_MODIFIED);
    }
}